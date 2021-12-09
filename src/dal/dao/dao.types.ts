import { ConditionalPartialBy } from '../../utils/utils'
import { AbstractDAOContext } from '../daoContext/daoContext'
import { DAOAssociation } from './associations/associations.types'
import { DAOMiddleware } from './middlewares/middlewares.types'
import { AnyProjection, ModelProjection, Projection } from './projections/projections.types'
import { Schema } from './schemas/schemas.types'
import { PartialDeep } from 'type-fest'
import { DefaultModelScalars } from '../..'

export type RequestArgs<Filter, Sort> = {
  start?: number
  limit?: number
  filter?: Filter
  sorts?: Sort[]
}

export type ReferenceChecksResponse<T> =
  | true
  | {
    association: DAOAssociation
    record: PartialDeep<T>
    failedReferences: any[]
  }[]

export type DAOResolver = {
  load: (parents: any[], projections: any) => Promise<any[]>
  match: (source: any, value: any) => boolean
}

export type FilterParams<FilterType, OptionsType> = {
  filter?: FilterType
  options?: OptionsType
}

export type FindOneParams<FilterType, ProjectionType, OptionsType> = FilterParams<FilterType, OptionsType> & {
  projection?: ProjectionType
}
export type FindParams<FilterType, ProjectionType, SortType, OptionsType> = FindOneParams<FilterType, ProjectionType, OptionsType> & {
  start?: number
  limit?: number
  sorts?: SortType[]
}

export type InsertParams<ModelType, IDKey extends keyof Omit<ModelType, ExcludedFields>, ExcludedFields extends keyof ModelType, IDAutogenerated extends boolean, OptionsType> = {
  record: ConditionalPartialBy<Omit<ModelType, ExcludedFields>, IDKey, IDAutogenerated>
  options?: OptionsType
}

export type UpdateParams<FilterType, UpdateType, OptionsType> = {
  filter: FilterType
  changes: UpdateType
  options?: OptionsType
}

export type ReplaceParams<FilterType, ModelType, ExcludedFields extends keyof ModelType, OptionsType> = {
  filter: FilterType
  replace: Omit<ModelType, ExcludedFields>
  options?: OptionsType
}

export type DeleteParams<FilterType, OptionsType> = {
  filter: FilterType
  options?: OptionsType
}

export type DAOParams<
  ModelType,
  IDKey extends keyof Omit<ModelType, ExcludedFields>,
  IDType,
  IDAutogenerated extends boolean,
  FilterType,
  ProjectionType,
  UpdateType,
  ExcludedFields extends keyof ModelType,
  SortType,
  OptionsType,
  DriverOptionsType,
  ScalarsType extends DefaultModelScalars,
  > = {
    idField: IDKey
    idGenerator?: () => IDType
    daoContext: AbstractDAOContext<ScalarsType, OptionsType>
    schema: Schema<ScalarsType>
    options?: OptionsType
    driverOptions: DriverOptionsType
    pageSize?: number
    associations?: DAOAssociation[]
    middlewares?: DAOMiddleware<ModelType, IDKey, IDAutogenerated, FilterType, AnyProjection<ModelType, ProjectionType>, UpdateType, ExcludedFields, SortType, OptionsType & DriverOptionsType, ScalarsType>[]
  }

export type MiddlewareContext<ScalarsType, IDKey> = { schema: Schema<ScalarsType>; idField: IDKey } // TODO: add DAOContext? How?

export interface DAO<
  ModelType,
  IDKey extends keyof Omit<ModelType, ExcludedFields>,
  IDAutogenerated extends boolean,
  FilterType,
  ProjectionType extends Projection<ModelType>,
  SortType,
  UpdateType,
  ExcludedFields extends keyof ModelType,
  OptionsType,
  > {
  findAll<P extends AnyProjection<ModelType, ProjectionType> = true>(params?: FindParams<FilterType, P, SortType, OptionsType>): Promise<ModelProjection<ModelType, P>[]>
  findOne<P extends AnyProjection<ModelType, ProjectionType> = true>(params?: FindOneParams<FilterType, P, OptionsType>): Promise<ModelProjection<ModelType, P> | null>
  findPage<P extends AnyProjection<ModelType, ProjectionType> = true>(
    params?: FindParams<FilterType, P, SortType, OptionsType>,
  ): Promise<{ totalCount: number; records: ModelProjection<ModelType, P>[] }>
  exists(params: FilterParams<FilterType, OptionsType>): Promise<boolean>
  count(params?: FilterParams<FilterType, OptionsType>): Promise<number>
  checkReferences(records: PartialDeep<ModelType> | PartialDeep<ModelType>[], options?: OptionsType): Promise<ReferenceChecksResponse<ModelType>>
  insertOne(params: InsertParams<ModelType, IDKey, ExcludedFields, IDAutogenerated, OptionsType>): Promise<Omit<ModelType, ExcludedFields>>
  updateOne(params: UpdateParams<FilterType, UpdateType, OptionsType>): Promise<void>
  updateAll(params: UpdateParams<FilterType, UpdateType, OptionsType>): Promise<void>
  replaceOne(params: ReplaceParams<FilterType, ModelType, ExcludedFields, OptionsType>): Promise<void>
  deleteOne(params: DeleteParams<FilterType, OptionsType>): Promise<void>
  deleteAll(params: DeleteParams<FilterType, OptionsType>): Promise<void>
}
