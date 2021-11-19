import { AnyProjection, ModelProjection } from '../utils/types'
import { ConditionalPartialBy } from '../utils/utils'
import { AbstractDAO } from './daoAbstract'

export class DAOWrapperAPIv1<
  ModelType,
  IDKey extends keyof Omit<ModelType, ExcludedFields>,
  IDAutogenerated extends boolean,
  FilterType,
  SortType,
  UpdateType,
  ExcludedFields extends keyof ModelType,
  OptionsType,
> {
  private idField: IDKey
  public apiV2: AbstractDAO<ModelType, IDKey, IDAutogenerated, FilterType, SortType, UpdateType, ExcludedFields, OptionsType>
  constructor(apiV2: AbstractDAO<ModelType, IDKey, IDAutogenerated, FilterType, SortType, UpdateType, ExcludedFields, OptionsType>, idField: IDKey) {
    this.apiV2 = apiV2
    this.idField = idField
  }

  protected idFilter<T extends Pick<ModelType, IDKey>>(model: T): FilterType {
    return { [this.idField]: model[this.idField] } as unknown as FilterType
  }

  async findAll<P extends AnyProjection<ModelType> = true>(
    filter: FilterType,
    projection?: P,
    sorts?: SortType,
    start?: number,
    limit?: number,
    options?: OptionsType,
  ): Promise<ModelProjection<ModelType, P>[]> {
    return this.apiV2.findAll({ filter, projection, sorts, start, limit, options })
  }

  async findPage<P extends AnyProjection<ModelType> = true>(
    filter: FilterType,
    projection?: P,
    sorts?: SortType,
    start?: number,
    limit?: number,
    options?: OptionsType,
  ): Promise<{ totalCount: number; records: ModelProjection<ModelType, P>[] }> {
    return this.apiV2.findPage({ filter, projection, sorts, start, limit, options })
  }

  async findOne<P extends AnyProjection<ModelType> = true>(filter: FilterType, projection?: P, options?: OptionsType): Promise<ModelProjection<ModelType, P> | null> {
    return this.apiV2.findOne({ filter, projection, options })
  }

  async exists(filter?: FilterType, options?: OptionsType): Promise<boolean> {
    return this.apiV2.exists({ filter, options })
  }

  async count(filter?: FilterType, options?: OptionsType): Promise<number> {
    return this.apiV2.count({ filter, options })
  }

  async insertOne(record: ConditionalPartialBy<Omit<ModelType, ExcludedFields>, IDKey, IDAutogenerated>, options?: OptionsType): Promise<Omit<ModelType, ExcludedFields>> {
    return this.apiV2.insertOne({ record, options })
  }

  async updateOne<T extends Pick<ModelType, IDKey>>(record: T, changes: UpdateType, options?: OptionsType): Promise<void> {
    return this.apiV2.updateOne({ filter: this.idFilter(record), changes, options })
  }

  async updateAll(filter: FilterType, changes: UpdateType, options?: OptionsType): Promise<void> {
    return this.apiV2.updateAll({ filter, changes, options })
  }

  async replaceOne<T extends Pick<ModelType, IDKey>>(record: T, replace: Omit<ModelType, ExcludedFields>, options?: OptionsType): Promise<void> {
    return this.apiV2.replaceOne({ filter: this.idFilter(record), replace, options })
  }

  async deleteOne<T extends Pick<ModelType, IDKey>>(record: T, options?: OptionsType): Promise<void> {
    return this.apiV2.deleteOne({ filter: this.idFilter(record), options })
  }

  async deleteAll(filter: FilterType, options?: OptionsType): Promise<void> {
    return this.apiV2.deleteAll({ filter, options })
  }
}
