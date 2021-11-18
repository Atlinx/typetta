import { Document, Model, Types } from 'mongoose'
import { mongooseProjection, addAssociationRefToProjection, ConditionalPartialBy } from '../../utils/utils'
import { DAOAssociationReference, AbstractDAO, DAOParams, FindParams, FindOneParams, FilterParams, InsertParams, UpdateParams, ReplaceParams, DeleteParams } from '../dao'
import { PartialDeep } from 'type-fest'
import { deepCopy, setTraversing, replaceType } from '@twinlogix/tl-commons'
import Bignumber from 'bignumber.js'
import { AbstractDAOContext } from '../daoContext'
import { AnyProjection, ModelProjection, Projection } from '../../utils/types'

export abstract class AbstractMongooseDAO<
  ModelType,
  IDKey extends keyof Omit<ModelType, ExcludedFields>,
  IDAutogenerated extends boolean,
  FilterType,
  SortType,
  UpdateType,
  ExcludedFields extends keyof ModelType,
  OptionsType extends { mongoose?: any },
> extends AbstractDAO<ModelType, IDKey, IDAutogenerated, FilterType, SortType, UpdateType, ExcludedFields, OptionsType> {
  public DBModel: Model<Document>

  protected constructor({
    dbModel,
    ...params
  }: { idField: IDKey; daoContext: AbstractDAOContext; dbModel: Model<Document> } & DAOParams<ModelType, IDKey, IDAutogenerated, FilterType, UpdateType, ExcludedFields, SortType, OptionsType>) {
    super(params)
    this.DBModel = dbModel
  }

  protected async dbToModel(dbRecord: Document | null, projections?: Projection<ModelType>): Promise<ModelType | null> {
    return (await this.dbToModels([dbRecord], projections))[0]
  }

  protected async dbToModels(dbRecords: (Document | null)[], projections?: Projection<ModelType>): Promise<ModelType[]> {
    let dbObjects = dbRecords.map((dbRecord) => this.dbToObject(dbRecord))
    dbObjects = await this.resolveAssociations(dbObjects, projections)
    return dbObjects
  }

  protected dbToObject(dbRecord: Document | null): any {
    return dbRecord ? this.replaceTypesDbToModel(deepCopy(dbRecord.toObject())) : dbRecord
  }

  protected replaceTypesDbToModel(obj: any): any {
    return replaceType(
      obj,
      (o: any): o is Types.Decimal128 => o instanceof Types.Decimal128,
      (o: Types.Decimal128) => new Bignumber(o.toString()),
    )
  }

  protected replaceTypesModelToDb(obj: any): any {
    return replaceType(
      obj,
      (o: any): o is Bignumber => o instanceof Bignumber,
      (o: Bignumber) => Types.Decimal128.fromString(o.toString()),
    )
  }

  protected modelToDb(model: Omit<ModelType, ExcludedFields> | PartialDeep<Omit<ModelType, ExcludedFields>> | ConditionalPartialBy<Omit<ModelType, ExcludedFields>, IDKey, IDAutogenerated>): any {
    return this.replaceTypesModelToDb(deepCopy(model))
  }

  protected filterToDB(filter?: FilterType): any {
    let dbFilter = this.replaceTypesModelToDb(deepCopy(filter))
    if (dbFilter && dbFilter._) {
      dbFilter = { ...dbFilter, ...dbFilter._ }
      delete dbFilter._
    }
    return dbFilter
  }

  protected projectionsToDB(projections?: Projection<ModelType>): any {
    let dbProjections = deepCopy(projections)

    // ENSURE CONNECTIONS FIELDS ARE SELECTED IF A CONNECTED ENTITY IS SELECTED
    if (dbProjections && typeof dbProjections === 'object') {
      this.associations
        .filter((association) => association.reference === DAOAssociationReference.INNER)
        .forEach((association) => addAssociationRefToProjection(association.field, association.refFrom, dbProjections))
      this.associations.filter((association) => association.reference === DAOAssociationReference.FOREIGN).forEach((association) => setTraversing(dbProjections, association.refTo, true))

      if (dbProjections._) {
        dbProjections = { ...dbProjections, ...dbProjections._ }
        delete dbProjections._
      }
    }
    return dbProjections
  }

  protected sortsToDB(sorts?: SortType): any {
    if (sorts) {
      let dbSorts
      if (Array.isArray(sorts)) {
        dbSorts = {}
        for (const sort of sorts) {
          dbSorts = { ...dbSorts, ...sort }
        }
      } else if ((sorts as any).sorts || (sorts as any)._) {
        dbSorts = {
          ...this.sortsToDB((sorts as any).sorts),
          ...(sorts as any)._,
        }
      } else {
        dbSorts = sorts
      }
      return dbSorts
    } else {
      return sorts
    }
  }

  protected updatesToDB(updates?: UpdateType): any {
    let dbUpdates = this.replaceTypesModelToDb(deepCopy(updates))
    if (dbUpdates._) {
      dbUpdates = { ...dbUpdates, ...dbUpdates._ }
      delete dbUpdates._
    }
    Object.keys(dbUpdates).forEach((v) => {
      if (dbUpdates[v] === undefined) {
        delete dbUpdates[v]
      }
    })
    return dbUpdates
  }

  protected async _find(params: FindParams<FilterType, Projection<ModelType>, SortType, OptionsType>): Promise<PartialDeep<ModelType>[]> {
    if (params.limit === 0) {
      return []
    } else {
      const dbOptions = { skip: params.start, limit: params.limit, sort: this.sortsToDB(params.sorts), ...(params.options || {}).mongoose }
      const query = this.DBModel.find(this.filterToDB(params.filter), mongooseProjection(this.projectionsToDB(params.projection), this.DBModel.schema), dbOptions)
      return (await this.dbToModels(await query.exec(), this.projectionsToDB(params.projection))) as PartialDeep<ModelType>[]
    }
  }

  protected async _findOne(params: FindOneParams<FilterType, Projection<ModelType>, OptionsType>): Promise<PartialDeep<ModelType> | null> {
    const query = this.DBModel.findOne(this.filterToDB(params.filter), mongooseProjection(this.projectionsToDB(params.projection), this.DBModel.schema), (params.options || {}).mongoose)
    return (await this.dbToModel(await query.exec(), this.projectionsToDB(params.projection))) as PartialDeep<ModelType> | null
  }

  protected async _findPage(params: FindParams<FilterType, Projection<ModelType>, SortType, OptionsType>): Promise<{ totalCount: number; records: PartialDeep<ModelType>[] }> {
    const totalCount = await this.count({ ...params })
    let records: PartialDeep<ModelType>[] = []
    if (totalCount > 0) {
      records = await this._find(params)
    }
    return { totalCount, records }
  }

  protected async findByQuery<P extends AnyProjection<ModelType>>(
    query: (dbRef: Model<Document>, dbProjections: any, dbSorts?: any, start?: number, limit?: number, options?: any) => Promise<Document[]>,
    projection?: P,
    sorts?: SortType,
    start?: number,
    limit?: number,
    options?: OptionsType,
  ): Promise<ModelProjection<ModelType, P>[]> {
    const params = await this.beforeFind({ projection, sorts, start, limit, options: options })
    if (params.limit === 0) {
      return []
    } else {
      const dbProjections = this.projectionsToDB(params.projection)
      const dbSorts = this.sortsToDB(params.sorts)
      //const dbOptions = { skip: params.start, limit: params.limit, sort: this.sortsToDB(params.sorts), ...(params.options || {}).mongoose }
      const dbRecords = await query(this.DBModel, dbProjections, dbSorts, params.start, params.limit, (params.options || {}).mongoose)
      const results = (await this.dbToModels(dbRecords, dbProjections)) as PartialDeep<ModelType>[]
      const mappedResults = []
      for (let i = 0; i < results.length; i++) {
        mappedResults.push(await this.afterFind(params, results[i]))
      }
      return mappedResults as ModelProjection<ModelType, P>[]
    }
  }

  protected async _exists(params: FilterParams<FilterType, OptionsType>): Promise<boolean> {
    return this.DBModel.exists(this.filterToDB(params.filter))
  }

  protected async _count(params: FilterParams<FilterType, OptionsType>): Promise<number> {
    return this.DBModel.count(this.filterToDB(params.filter)).exec()
  }

  protected async _insertOne(params: InsertParams<ModelType, IDKey, ExcludedFields, IDAutogenerated, OptionsType>): Promise<Omit<ModelType, ExcludedFields>> {
    const dbObjects = await this.DBModel.create([this.modelToDb(params.record)], (params.options || {}).mongoose)
    params.record[this.idField] = (dbObjects[0].toObject() as any)[this.idField]
    return params.record as Omit<ModelType, ExcludedFields>
  }

  protected async _updateOne(params: UpdateParams<FilterType, UpdateType, OptionsType>): Promise<void> {
    if (params.options && params.options.mongoose) {
      await this.DBModel.updateOne(this.filterToDB(params.filter), this.updatesToDB(params.changes), params.options.mongoose).exec()
    } else {
      const res = await this.DBModel.updateOne(this.filterToDB(params.filter), this.updatesToDB(params.changes)).exec()
    }
  }

  protected async _updateMany(params: UpdateParams<FilterType, UpdateType, OptionsType>): Promise<void> {
    if (params.options && params.options.mongoose) {
      await this.DBModel.updateMany(this.filterToDB(params.filter), this.updatesToDB(params.changes), params.options.mongoose).exec()
    } else {
      await this.DBModel.updateMany(this.filterToDB(params.filter), this.updatesToDB(params.changes)).exec()
    }
  }

  protected async _replaceOne(params: ReplaceParams<FilterType, ModelType, ExcludedFields, OptionsType>): Promise<void> {
    await this.DBModel.replaceOne(params.filter, this.modelToDb(params.replace))
  }

  protected async _deleteOne(params: DeleteParams<FilterType, OptionsType>): Promise<void> {
    if (params.options && params.options.mongoose) {
      await this.DBModel.deleteOne(this.filterToDB(params.filter), params.options.mongoose).exec()
    } else {
      await this.DBModel.deleteOne(this.filterToDB(params.filter)).exec()
    }
  }

  protected async _deleteMany(params: DeleteParams<FilterType, OptionsType>): Promise<void> {
    if (params.options && params.options.mongoose) {
      await this.DBModel.deleteMany(this.filterToDB(params.filter), params.options.mongoose).exec()
    } else {
      await this.DBModel.deleteMany(this.filterToDB(params.filter)).exec()
    }
  }
}
