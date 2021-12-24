import { deepCopy, deepMerge, getTraversing, reversed, setTraversing } from '../../utils/utils'
import { AbstractDAOContext } from '../daoContext/daoContext'
import { DAOWrapperAPIv1 } from '../legacy/daoWrapperAPIv1'
import { addAssociationRefToProjection } from './associations/associations'
import { DAOAssociation, DAOAssociationReference, DAOAssociationType } from './associations/associations.types'
import {
  MiddlewareContext,
  DAO,
  DAOParams,
  DAOResolver,
  DeleteParams,
  FilterParams,
  FindOneParams,
  FindParams,
  InsertParams,
  ReferenceChecksResponse,
  ReplaceParams,
  UpdateParams,
  DAOGenerics,
} from './dao.types'
import { DAOMiddleware, MiddlewareInput, MiddlewareOutput, SelectAfterMiddlewareOutputType, SelectBeforeMiddlewareOutputType } from './middlewares/middlewares.types'
import { AnyProjection, GenericProjection, ModelProjection } from './projections/projections.types'
import { getProjection } from './projections/projections.utils'
import { Schema } from './schemas/schemas.types'
import DataLoader from 'dataloader'
import _ from 'lodash'
import objectHash from 'object-hash'
import { PartialDeep } from 'type-fest'

export abstract class AbstractDAO<T extends DAOGenerics> implements DAO<T> {
  protected idField: T['idKey']
  protected idGeneration: T['idGeneration']
  protected daoContext: AbstractDAOContext<T['scalars'], T['metadata']>
  protected associations: DAOAssociation[]
  protected middlewares: DAOMiddleware<T>[]
  protected pageSize: number
  protected resolvers: { [key: string]: DAOResolver | undefined }
  protected dataLoaders: Map<string, DataLoader<T['model'][T['idKey']], T['model'][] | null>>
  protected metadata?: T['metadata']
  protected driverContext: T['driverContext']
  protected schema: Schema<T['scalars']>
  protected idGenerator?: () => T['scalars'][T['idScalar']]
  public apiV1: DAOWrapperAPIv1<T>

  protected constructor({
    idField,
    idScalar,
    idGeneration,
    idGenerator,
    daoContext,
    pageSize = 50,
    associations = [],
    middlewares = [],
    schema,
    metadata,
    driverContext: driverOptions,
  }: DAOParams<T>) {
    this.dataLoaders = new Map<string, DataLoader<T['model'][T['idKey']], T['model'][]>>()
    this.idField = idField
    this.idGenerator = idGenerator
    this.daoContext = daoContext
    this.pageSize = pageSize
    this.resolvers = {}
    this.associations = associations
    this.associations.forEach((association) => this.addResolver(association))
    this.idGeneration = idGeneration
    const generator = this.idGenerator || this.daoContext.idGenerators[idScalar]
    if (this.idGeneration === 'generator' && !generator) {
      throw new Error(`ID generator for scalar ${idScalar} is missing. Define one in DAOContext or in DAOParams.`)
    }
    this.middlewares = [
      {
        before: async (args, context) => {
          if (args.operation === 'findAll') {
            return {
              continue: true,
              operation: args.operation,
              params: {
                ...args.params,
                projection: this.elabAssociationProjection(args.params.projection),
              },
            }
          }
          if (args.operation === 'insertOne' && this.idGeneration === 'generator' && generator && !Object.keys(args.params.record).includes(this.idField)) {
            return {
              continue: true,
              operation: args.operation,
              params: { ...args.params, record: { ...args.params.record, [context.idField]: generator() } },
            }
          }
        },
      },
      ...middlewares,
    ]
    this.metadata = metadata
    this.driverContext = driverOptions
    this.schema = schema
    this.apiV1 = new DAOWrapperAPIv1<T>(this, idField)
  }

  async findAll<P extends AnyProjection<T['projection']>>(params: FindParams<T, P> = {}): Promise<ModelProjection<T['model'], T['projection'], P>[]> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'findAll', params })
    const records = beforeResults.continue ? await this._find(beforeResults.params) : beforeResults.records
    const resolvedRecors = await this.resolveAssociations(records, beforeResults.params.projection)
    const afterResults = await this.executeAfterMiddlewares({ operation: 'findAll', params: beforeResults.params, records: resolvedRecors }, beforeResults.middlewareIndex)
    return afterResults.records as ModelProjection<T['model'], T['projection'], P>[]
  }

  async findOne<P extends AnyProjection<T['projection']>>(params: FindOneParams<T, P> = {}): Promise<ModelProjection<T['model'], T['projection'], P> | null> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'findAll', params })
    const record = beforeResults.continue ? await this._findOne(beforeResults.params) : beforeResults.records.length > 0 ? beforeResults.records[0] : null
    const resolvedRecors = record ? await this.resolveAssociations([record], beforeResults.params.projection) : []
    const afterResults = await this.executeAfterMiddlewares({ operation: 'findAll', params: beforeResults.params, records: resolvedRecors }, beforeResults.middlewareIndex)
    return afterResults.records.length > 0 ? afterResults.records[0] : null
  }

  async findPage<P extends AnyProjection<T['projection']>>(params: FindParams<T, P> = {}): Promise<{ totalCount: number; records: ModelProjection<T['model'], T['projection'], P>[] }> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'findAll', params })
    const { totalCount, records } = beforeResults.continue ? await this._findPage(beforeResults.params) : { records: beforeResults.records, totalCount: beforeResults.totalCount ?? 0 }
    const resolvedRecors = await this.resolveAssociations(records, beforeResults.params.projection)
    const afterResults = await this.executeAfterMiddlewares({ operation: 'findAll', params: beforeResults.params, records: resolvedRecors, totalCount }, beforeResults.middlewareIndex)
    return {
      totalCount: afterResults.totalCount ?? 0,
      records: afterResults.records as ModelProjection<T['model'], T['projection'], P>[],
    }
  }

  async exists(params: FilterParams<T>): Promise<boolean> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'findAll', params })
    return this._exists(beforeResults.params)
  }

  async count(params: FilterParams<T> = {}): Promise<number> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'findAll', params })
    return this._count(beforeResults.params)
  }

  async checkReferences(records: PartialDeep<T['model']> | PartialDeep<T['model']>[]): Promise<ReferenceChecksResponse<T['model']>> {
    const errors = []
    if (records) {
      const inputRecords = records instanceof Array ? records : [records]
      for (const association of this.associations) {
        if (association.reference === DAOAssociationReference.INNER) {
          const associationProjection = {}
          setTraversing(associationProjection, association.refTo, true)
          const resolver: DAOResolver = this.resolvers[association.field]!

          const associationFieldPathSplitted = association.field.split('.')
          associationFieldPathSplitted.pop()
          const parentPath = associationFieldPathSplitted.join('.')
          const parents = getTraversing(inputRecords, parentPath)
          const associatedRecords = await resolver.load(parents, associationProjection)

          for (const inputRecord of inputRecords) {
            const notFoundRefsFrom = getTraversing(inputRecord, association.refFrom).filter((refFrom) => {
              return !associatedRecords.find(
                (associatedRecord) => associatedRecord && getTraversing(associatedRecord, association.refTo).length > 0 && refFrom === getTraversing(associatedRecord, association.refTo)[0],
              )
            })
            if (notFoundRefsFrom.length > 0) {
              errors.push({ association, record: inputRecord, failedReferences: notFoundRefsFrom })
            }
          }
        }
      }
    }
    if (errors.length > 0) {
      return errors
    } else {
      return true
    }
  }

  // -----------------------------------------------------------------------
  // ---------------------------- ASSOCIATIONS -----------------------------
  // -----------------------------------------------------------------------
  private async load(
    keys: T['idKey'][],
    buildFilter: (keys: T['idKey'][]) => T['filter'],
    hasKey: (record: T['model'], key: T['idKey']) => boolean,
    projection: T['projection'],
    loaderIdetifier: string = '',
  ): Promise<(T['model'] | null | Error)[]> {
    const dataLoader = this.getDataLoader(buildFilter, hasKey, projection, loaderIdetifier)
    const loadedResults = await dataLoader.loadMany(keys)
    const results = []
    for (const loadedResult of loadedResults) {
      if (loadedResult instanceof Error) {
        throw loadedResult
      } else if (loadedResult !== null) {
        results.push(...loadedResult)
      }
    }
    return results
  }

  private getDataLoader(
    buildFilter: (keys: any[]) => T['filter'],
    hasKey: (record: T['model'], key: any) => boolean,
    projection: T['projection'],
    loaderIdetifier: string,
  ): DataLoader<any, T['model'][] | null> {
    const hash = loaderIdetifier + '-' + objectHash(projection || null, { respectType: false, unorderedArrays: true })
    const dataLoader = this.dataLoaders.get(hash)
    if (dataLoader) {
      return dataLoader
    } else {
      const newDataLoader = new DataLoader<any, T['model'][] | null>(
        async (keys) => {
          const filter = buildFilter(keys as T['model'][T['idKey']][])
          const loadedResults: any[] = await this.findAll({ filter, projection })
          const orderedResults = []
          for (const key of keys) {
            orderedResults.push(loadedResults.filter((loadedResult) => hasKey(loadedResult, key)) || null)
          }
          return orderedResults
        },
        {
          maxBatchSize: this.pageSize,
        },
      )
      this.dataLoaders.set(hash, newDataLoader)
      return newDataLoader
    }
  }

  private elabAssociationProjection<P extends AnyProjection<T['projection']>>(projection?: P): P | undefined {
    if (projection === true || !projection) {
      return projection
    }
    const dbProjections = deepCopy(projection) // IMPROVE: make addAssociationRefToProjection functional and stop using side effects
    this.associations
      .filter((association) => association.reference === DAOAssociationReference.INNER)
      .forEach((association) => addAssociationRefToProjection(association.field, association.refFrom, dbProjections))
    this.associations.filter((association) => association.reference === DAOAssociationReference.FOREIGN).forEach((association) => setTraversing(dbProjections, association.refTo, true))
    return dbProjections
  }

  private async resolveAssociations(dbObjects: any[], projections?: AnyProjection<T['projection']>): Promise<PartialDeep<T['model']>[]> {
    for (const association of this.associations) {
      if (projections) {
        const associationProjection = getProjection(projections as GenericProjection, association.field)
        if (associationProjection && projections !== true) {
          if (associationProjection !== true) {
            if (association.reference === DAOAssociationReference.INNER) {
              setTraversing(associationProjection, association.refTo, true)
            } else if (association.reference === DAOAssociationReference.FOREIGN) {
              setTraversing(associationProjection, association.refFrom, true)
            }
          }
          const resolver: DAOResolver = this.resolvers[association.field]!

          const associationFieldPathSplitted = association.field.split('.')
          const associationField = associationFieldPathSplitted.pop()
          if (associationField) {
            const parentPath = associationFieldPathSplitted.join('.')
            const parents = getTraversing(
              dbObjects.filter((dbObject) => dbObject != null),
              parentPath,
            )
            const associatedRecords = await resolver.load(parents, associationProjection)
            parents.forEach((parent) => {
              if (association.type === DAOAssociationType.ONE_TO_ONE) {
                parent[associationField] =
                  associatedRecords.find((value) => {
                    return resolver.match(parent, value)
                  }) || null
              } else if (association.type === DAOAssociationType.ONE_TO_MANY) {
                parent[associationField] =
                  associatedRecords.filter((value) => {
                    return resolver.match(parent, value)
                  }) || null
              }
            })
          }
        }
      }
    }
    return dbObjects
  }

  private addResolver(association: DAOAssociation) {
    let resolver

    if (association.reference === DAOAssociationReference.INNER) {
      const refFrom = association.refFrom.split('.').pop()
      const refTo = association.refTo
      const linkedDAO = association.dao
      if (refFrom) {
        if (association.type === DAOAssociationType.ONE_TO_ONE) {
          resolver = {
            load: async (parents: any[], projections: any) => {
              const ids = parents.map((parent) => parent[refFrom]).filter((value, index, self) => value !== null && value !== undefined && self.indexOf(value) === index)

              return this.daoContext.dao(linkedDAO).load(
                ids,
                association.buildFilter ||
                  ((keys: any[]): T['filter'] => {
                    // @ts-ignore
                    return { [refTo]: { $in: keys } }
                  }),
                association.hasKey ||
                  ((record: T['model'], key: any): boolean => {
                    return (record as any)[refTo] === key
                  }),
                projections,
                refTo,
              )
            },
            match: (source: any, value: any): boolean => {
              return source[refFrom] === value[refTo]
            },
          }
        } else if (association.type === DAOAssociationType.ONE_TO_MANY) {
          resolver = {
            load: async (parents: any[], projections: any) => {
              const ids = parents
                .map((parent) => parent[refFrom])
                .filter((value) => value !== null && value !== undefined)
                .reduce((a, c) => [...a, ...c], [])
                .filter((value: any[], index: number, self: any) => self.indexOf(value) === index)

              return this.daoContext.dao(linkedDAO).load(
                ids,
                association.buildFilter ||
                  ((keys: any[]): T['filter'] => {
                    // @ts-ignore
                    return { [refTo]: { $in: keys } }
                  }),
                association.hasKey ||
                  ((record: T['model'], key: any): boolean => {
                    return (record as any)[refTo] === key
                  }),
                projections,
                refTo,
              )
            },
            match: (source: any, value: any): boolean => {
              return source[refFrom] && source[refFrom].includes(value[refTo])
            },
          }
        }
      }
    } else if (association.reference === DAOAssociationReference.FOREIGN) {
      const refFrom = association.refFrom
      const refTo = association.refTo.split('.').pop()
      const linkedDAO = association.dao
      if (refTo) {
        resolver = {
          load: async (parents: any[], projections: any) => {
            const ids = parents.map((parent) => parent[refTo]).filter((value, index, self) => value !== null && value !== undefined && self.indexOf(value) === index)

            return this.daoContext.dao(linkedDAO).load(
              ids,
              association.buildFilter ||
                ((keys: any[]): T['filter'] => {
                  // @ts-ignore
                  return { [refFrom]: { $in: keys } }
                }),
              association.hasKey ||
                ((record: T['model'], key: any): boolean => {
                  return (record as any)[refFrom] === key
                }),
              projections,
              refFrom,
            )
          },
          match: (source: any, value: any): boolean => {
            const tmp = getTraversing(value, refFrom)
            return tmp.includes(source[refTo])
          },
        }
      }
    }
    this.resolvers[association.field] = resolver
  }

  async insertOne(params: InsertParams<T>): Promise<Omit<T['model'], T['exludedFields']>> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'insertOne', params })
    const record = beforeResults.continue ? await this._insertOne(beforeResults.params) : beforeResults.record
    const afterResults = await this.executeAfterMiddlewares({ operation: 'insertOne', params: beforeResults.params, record }, beforeResults.middlewareIndex)
    return afterResults.record
  }

  async updateOne(params: UpdateParams<T>): Promise<void> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'updateOne', params })
    if (beforeResults.continue) {
      await this._updateOne(beforeResults.params)
    }
    await this.executeAfterMiddlewares({ operation: 'updateOne', params: beforeResults.params }, beforeResults.middlewareIndex)
  }

  async updateAll(params: UpdateParams<T>): Promise<void> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'updateAll', params })
    if (beforeResults.continue) {
      await this._updateMany(beforeResults.params)
    }
    await this.executeAfterMiddlewares({ operation: 'updateAll', params: beforeResults.params }, beforeResults.middlewareIndex)
  }

  async replaceOne(params: ReplaceParams<T>): Promise<void> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'replaceOne', params })
    if (beforeResults.continue) {
      await this._replaceOne(beforeResults.params)
    }
    await this.executeAfterMiddlewares({ operation: 'replaceOne', params: beforeResults.params }, beforeResults.middlewareIndex)
  }

  async deleteOne(params: DeleteParams<T>): Promise<void> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'deleteOne', params })
    if (beforeResults.continue) {
      await this._deleteOne(beforeResults.params)
    }
    await this.executeAfterMiddlewares({ operation: 'deleteOne', params: beforeResults.params }, beforeResults.middlewareIndex)
  }

  async deleteAll(params: DeleteParams<T>): Promise<void> {
    const beforeResults = await this.executeBeforeMiddlewares({ operation: 'deleteAll', params })
    if (beforeResults.continue) {
      await this._deleteMany(beforeResults.params)
    }
    await this.executeAfterMiddlewares({ operation: 'deleteAll', params: beforeResults.params }, beforeResults.middlewareIndex)
  }

  private createMiddlewareContext(): MiddlewareContext<T> {
    return { schema: this.schema, idField: this.idField, driver: this.driverContext, metadata: this.metadata }
  }

  private async executeBeforeMiddlewares<I extends MiddlewareInput<T>>(input: I): Promise<SelectBeforeMiddlewareOutputType<T, I> & { middlewareIndex?: number }> {
    const middlewareContext = this.createMiddlewareContext()
    for (const [before, index] of this.middlewares.flatMap((m, i) => (m.before ? [[m.before, i] as const] : []))) {
      const result = await before(input, middlewareContext)
      if (!result) {
        continue
      }
      if (result.operation !== input.operation) {
        throw new Error(`Invalid operation. Expecting '${input.operation}' but received '${result.operation}'.`)
      }
      if (result.continue) {
        input = result as unknown as I
      } else {
        return { ...result, middlewareIndex: index } as unknown as SelectBeforeMiddlewareOutputType<T, I> & { middlewareIndex?: number }
      }
    }
    return { ...input, continue: true } as unknown as SelectBeforeMiddlewareOutputType<T, I> & { middlewareIndex?: number }
  }

  private async executeAfterMiddlewares<I extends MiddlewareOutput<T>>(input: I, middlewareIndex: number | undefined): Promise<SelectAfterMiddlewareOutputType<T, I>> {
    const middlewareContext = this.createMiddlewareContext()
    for (const after of reversed((middlewareIndex ? this.middlewares.slice(0, middlewareIndex + 1) : this.middlewares).flatMap((m) => (m.after ? [m.after] : [])))) {
      const result = await after(input, middlewareContext)
      if (!result) {
        continue
      }
      if (result.operation !== input.operation) {
        throw new Error(`Invalid operation. Expecting '${input.operation}' but received '${result.operation}'.`)
      }
      if (result.continue) {
        input = result as unknown as I
      } else {
        return result as unknown as SelectAfterMiddlewareOutputType<T, I>
      }
    }
    return input as unknown as SelectAfterMiddlewareOutputType<T, I>
  }

  // -----------------------------------------------------------------------
  // ------------------------------ ABSTRACTS ------------------------------
  // -----------------------------------------------------------------------
  protected abstract _find<P extends AnyProjection<T['projection']>>(params: FindParams<T, P>): Promise<PartialDeep<T['model']>[]>
  protected abstract _findOne<P extends AnyProjection<T['projection']>>(params: FindOneParams<T, P>): Promise<PartialDeep<T['model']> | null>
  protected abstract _findPage<P extends AnyProjection<T['projection']>>(params: FindParams<T, P>): Promise<{ totalCount: number; records: PartialDeep<T['model']>[] }>
  protected abstract _exists(params: FilterParams<T>): Promise<boolean>
  protected abstract _count(params: FilterParams<T>): Promise<number>
  protected abstract _insertOne(params: InsertParams<T>): Promise<Omit<T['model'], T['exludedFields']>>
  protected abstract _updateOne(params: UpdateParams<T>): Promise<void>
  protected abstract _updateMany(params: UpdateParams<T>): Promise<void>
  protected abstract _replaceOne(params: ReplaceParams<T>): Promise<void>
  protected abstract _deleteOne(params: DeleteParams<T>): Promise<void>
  protected abstract _deleteMany(params: DeleteParams<T>): Promise<void>
}
