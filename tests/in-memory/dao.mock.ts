import * as T from '../../src'
import * as types from './models.mock'

//--------------------------------------------------------------------------------
//----------------------------------- ADDRESS ------------------------------------
//--------------------------------------------------------------------------------

export type AddressExcludedFields = never
export type AddressRelationFields = 'cities'

export function addressSchema(): T.Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    }
  }
}

type AddressFilterFields = {
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators
}
export type AddressFilter = AddressFilterFields & T.LogicalOperators<AddressFilterFields | AddressRawFilter>
export type AddressRawFilter = never

export type AddressRelations = {
  cities?: {
    filter?: CityFilter
    sorts?: CitySort[] | CityRawSort
    skip?: number
    limit?: number
    relations?: CityRelations
  }
}

export type AddressProjection = {
  cities?: CityProjection | boolean,
  id?: boolean,
}
export type AddressParam<P extends AddressProjection> = T.ParamProjection<types.Address, AddressProjection, P>

export type AddressSortKeys = 'id'
export type AddressSort = T.OneKey<AddressSortKeys, T.SortDirection>
export type AddressRawSort = never

export type AddressUpdate = {
  'id'?: types.Scalars['ID']
}
export type AddressRawUpdate = never

export type AddressInsert = {
  id?: null | types.Scalars['ID'],
}

type AddressDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.Address, 'id', 'ID', AddressFilter, AddressRawFilter, AddressRelations, AddressProjection, AddressSort, AddressRawSort, AddressInsert, AddressUpdate, AddressRawUpdate, AddressExcludedFields, AddressRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'address', DAOContext<MetadataType, OperationMetadataType>>
export type AddressDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<AddressDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryAddressDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<AddressDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class AddressDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<AddressDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends AddressProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends AddressProjection, P2 extends AddressProjection>(p1: P1, p2: P2): T.SelectProjection<AddressProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<AddressProjection, P1, P2>
  }
  
  public constructor(params: AddressDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: addressSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'cities', refFrom: 'addressId', refTo: 'id', dao: 'city', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryAddressDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<AddressDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends AddressProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends AddressProjection, P2 extends AddressProjection>(p1: P1, p2: P2): T.SelectProjection<AddressProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<AddressProjection, P1, P2>
  }
  
  public constructor(params: InMemoryAddressDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: addressSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'cities', refFrom: 'addressId', refTo: 'id', dao: 'city', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//------------------------------------ AUDIT -------------------------------------
//--------------------------------------------------------------------------------

export type AuditExcludedFields = never
export type AuditRelationFields = never

export function auditSchema(): T.Schema<types.Scalars> {
  return {
    'changes': {
      scalar: 'String'
    },
    'entityId': {
      scalar: 'ID', 
      required: true
    },
    'id': {
      scalar: 'ID', 
      required: true, 
      alias: '_id'
    }
  }
}

type AuditFilterFields = {
  'changes'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'entityId'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators
}
export type AuditFilter = AuditFilterFields & T.LogicalOperators<AuditFilterFields | AuditRawFilter>
export type AuditRawFilter = never

export type AuditRelations = Record<never, string>

export type AuditProjection = {
  changes?: boolean,
  entityId?: boolean,
  id?: boolean,
}
export type AuditParam<P extends AuditProjection> = T.ParamProjection<types.Audit, AuditProjection, P>

export type AuditSortKeys = 'changes' | 'entityId' | 'id'
export type AuditSort = T.OneKey<AuditSortKeys, T.SortDirection>
export type AuditRawSort = never

export type AuditUpdate = {
  'changes'?: types.Scalars['String'] | null,
  'entityId'?: types.Scalars['ID'],
  'id'?: types.Scalars['ID']
}
export type AuditRawUpdate = never

export type AuditInsert = {
  changes?: null | types.Scalars['String'],
  entityId: types.Scalars['ID'],
}

type AuditDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.Audit, 'id', 'ID', AuditFilter, AuditRawFilter, AuditRelations, AuditProjection, AuditSort, AuditRawSort, AuditInsert, AuditUpdate, AuditRawUpdate, AuditExcludedFields, AuditRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'audit', DAOContext<MetadataType, OperationMetadataType>>
export type AuditDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<AuditDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryAuditDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<AuditDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class AuditDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<AuditDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends AuditProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends AuditProjection, P2 extends AuditProjection>(p1: P1, p2: P2): T.SelectProjection<AuditProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<AuditProjection, P1, P2>
  }
  
  public constructor(params: AuditDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: auditSchema(), 
      relations: T.overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryAuditDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<AuditDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends AuditProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends AuditProjection, P2 extends AuditProjection>(p1: P1, p2: P2): T.SelectProjection<AuditProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<AuditProjection, P1, P2>
  }
  
  public constructor(params: InMemoryAuditDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: auditSchema(), 
      relations: T.overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//---------------------------------- AUDITABLE -----------------------------------
//--------------------------------------------------------------------------------

export function auditableSchema(): T.Schema<types.Scalars> {
  return {
    'createdBy': {
      scalar: 'String', 
      required: true
    },
    'createdOn': {
      scalar: 'Int', 
      required: true
    },
    'deletedOn': {
      scalar: 'Int'
    },
    'modifiedBy': {
      scalar: 'String', 
      required: true
    },
    'modifiedOn': {
      scalar: 'Int', 
      required: true
    },
    'state': {
      scalar: 'String', 
      required: true
    }
  }
}

export type AuditableProjection = {
  createdBy?: boolean,
  createdOn?: boolean,
  deletedOn?: boolean,
  modifiedBy?: boolean,
  modifiedOn?: boolean,
  state?: boolean,
  versions?: AuditProjection | boolean,
}
export type AuditableParam<P extends AuditableProjection> = T.ParamProjection<types.Auditable, AuditableProjection, P>

export type AuditableInsert = {
  createdBy: types.Scalars['String'],
  createdOn: types.Scalars['Int'],
  deletedOn?: null | types.Scalars['Int'],
  modifiedBy: types.Scalars['String'],
  modifiedOn: types.Scalars['Int'],
  state: types.State,
}



//--------------------------------------------------------------------------------
//------------------------------------- CITY -------------------------------------
//--------------------------------------------------------------------------------

export type CityExcludedFields = 'computedAddressName' | 'computedName'
export type CityRelationFields = never

export function citySchema(): T.Schema<types.Scalars> {
  return {
    'addressId': {
      scalar: 'ID', 
      required: true
    },
    'id': {
      scalar: 'ID', 
      required: true
    },
    'name': {
      scalar: 'String', 
      required: true
    }
  }
}

type CityFilterFields = {
  'addressId'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'name'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators
}
export type CityFilter = CityFilterFields & T.LogicalOperators<CityFilterFields | CityRawFilter>
export type CityRawFilter = never

export type CityRelations = Record<never, string>

export type CityProjection = {
  addressId?: boolean,
  computedAddressName?: boolean,
  computedName?: boolean,
  id?: boolean,
  name?: boolean,
}
export type CityParam<P extends CityProjection> = T.ParamProjection<types.City, CityProjection, P>

export type CitySortKeys = 'addressId' | 'id' | 'name'
export type CitySort = T.OneKey<CitySortKeys, T.SortDirection>
export type CityRawSort = never

export type CityUpdate = {
  'addressId'?: types.Scalars['ID'],
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String']
}
export type CityRawUpdate = never

export type CityInsert = {
  addressId: types.Scalars['ID'],
  id?: null | types.Scalars['ID'],
  name: types.Scalars['String'],
}

type CityDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.City, 'id', 'ID', CityFilter, CityRawFilter, CityRelations, CityProjection, CitySort, CityRawSort, CityInsert, CityUpdate, CityRawUpdate, CityExcludedFields, CityRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'city', DAOContext<MetadataType, OperationMetadataType>>
export type CityDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<CityDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryCityDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<CityDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class CityDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<CityDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends CityProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends CityProjection, P2 extends CityProjection>(p1: P1, p2: P2): T.SelectProjection<CityProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<CityProjection, P1, P2>
  }
  
  public constructor(params: CityDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: citySchema(), 
      relations: T.overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryCityDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<CityDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends CityProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends CityProjection, P2 extends CityProjection>(p1: P1, p2: P2): T.SelectProjection<CityProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<CityProjection, P1, P2>
  }
  
  public constructor(params: InMemoryCityDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: citySchema(), 
      relations: T.overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//----------------------------- DEFAULTFIELDSENTITY ------------------------------
//--------------------------------------------------------------------------------

export type DefaultFieldsEntityExcludedFields = never
export type DefaultFieldsEntityRelationFields = never

export function defaultFieldsEntitySchema(): T.Schema<types.Scalars> {
  return {
    'creationDate': {
      scalar: 'Int', 
      required: true, 
      defaultGenerationStrategy: 'middleware'
    },
    'id': {
      scalar: 'ID', 
      required: true
    },
    'live': {
      scalar: 'Live', 
      required: true, 
      defaultGenerationStrategy: 'generator'
    },
    'name': {
      scalar: 'String', 
      required: true
    },
    'opt1': {
      scalar: 'Live', 
      defaultGenerationStrategy: 'middleware'
    },
    'opt2': {
      scalar: 'Live', 
      defaultGenerationStrategy: 'generator'
    }
  }
}

type DefaultFieldsEntityFilterFields = {
  'creationDate'?: types.Scalars['Int'] | null | T.EqualityOperators<types.Scalars['Int']> | T.ElementOperators | T.QuantityOperators<types.Scalars['Int']>,
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'live'?: types.Scalars['Live'] | null | T.EqualityOperators<types.Scalars['Live']> | T.ElementOperators,
  'name'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'opt1'?: types.Scalars['Live'] | null | T.EqualityOperators<types.Scalars['Live']> | T.ElementOperators,
  'opt2'?: types.Scalars['Live'] | null | T.EqualityOperators<types.Scalars['Live']> | T.ElementOperators
}
export type DefaultFieldsEntityFilter = DefaultFieldsEntityFilterFields & T.LogicalOperators<DefaultFieldsEntityFilterFields | DefaultFieldsEntityRawFilter>
export type DefaultFieldsEntityRawFilter = never

export type DefaultFieldsEntityRelations = Record<never, string>

export type DefaultFieldsEntityProjection = {
  creationDate?: boolean,
  id?: boolean,
  live?: boolean,
  name?: boolean,
  opt1?: boolean,
  opt2?: boolean,
}
export type DefaultFieldsEntityParam<P extends DefaultFieldsEntityProjection> = T.ParamProjection<types.DefaultFieldsEntity, DefaultFieldsEntityProjection, P>

export type DefaultFieldsEntitySortKeys = 'creationDate' | 'id' | 'live' | 'name' | 'opt1' | 'opt2'
export type DefaultFieldsEntitySort = T.OneKey<DefaultFieldsEntitySortKeys, T.SortDirection>
export type DefaultFieldsEntityRawSort = never

export type DefaultFieldsEntityUpdate = {
  'creationDate'?: types.Scalars['Int'],
  'id'?: types.Scalars['ID'],
  'live'?: types.Scalars['Live'],
  'name'?: types.Scalars['String'],
  'opt1'?: types.Scalars['Live'] | null,
  'opt2'?: types.Scalars['Live'] | null
}
export type DefaultFieldsEntityRawUpdate = never

export type DefaultFieldsEntityInsert = {
  creationDate?: null | types.Scalars['Int'],
  id: types.Scalars['ID'],
  live?: null | types.Scalars['Live'],
  name: types.Scalars['String'],
  opt1?: null | types.Scalars['Live'],
  opt2?: null | types.Scalars['Live'],
}

type DefaultFieldsEntityDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.DefaultFieldsEntity, 'id', 'ID', DefaultFieldsEntityFilter, DefaultFieldsEntityRawFilter, DefaultFieldsEntityRelations, DefaultFieldsEntityProjection, DefaultFieldsEntitySort, DefaultFieldsEntityRawSort, DefaultFieldsEntityInsert, DefaultFieldsEntityUpdate, DefaultFieldsEntityRawUpdate, DefaultFieldsEntityExcludedFields, DefaultFieldsEntityRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'defaultFieldsEntity', DAOContext<MetadataType, OperationMetadataType>>
export type DefaultFieldsEntityDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<DefaultFieldsEntityDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryDefaultFieldsEntityDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<DefaultFieldsEntityDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class DefaultFieldsEntityDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<DefaultFieldsEntityDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends DefaultFieldsEntityProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends DefaultFieldsEntityProjection, P2 extends DefaultFieldsEntityProjection>(p1: P1, p2: P2): T.SelectProjection<DefaultFieldsEntityProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<DefaultFieldsEntityProjection, P1, P2>
  }
  
  public constructor(params: DefaultFieldsEntityDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: defaultFieldsEntitySchema(), 
      relations: T.overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'user', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryDefaultFieldsEntityDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<DefaultFieldsEntityDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends DefaultFieldsEntityProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends DefaultFieldsEntityProjection, P2 extends DefaultFieldsEntityProjection>(p1: P1, p2: P2): T.SelectProjection<DefaultFieldsEntityProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<DefaultFieldsEntityProjection, P1, P2>
  }
  
  public constructor(params: InMemoryDefaultFieldsEntityDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: defaultFieldsEntitySchema(), 
      relations: T.overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'user', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//------------------------------------ DEVICE ------------------------------------
//--------------------------------------------------------------------------------

export type DeviceExcludedFields = never
export type DeviceRelationFields = 'user'

export function deviceSchema(): T.Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'name': {
      scalar: 'String', 
      required: true
    },
    'userId': {
      scalar: 'ID'
    }
  }
}

type DeviceFilterFields = {
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'name'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'userId'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators
}
export type DeviceFilter = DeviceFilterFields & T.LogicalOperators<DeviceFilterFields | DeviceRawFilter>
export type DeviceRawFilter = never

export type DeviceRelations = Record<never, string>

export type DeviceProjection = {
  id?: boolean,
  name?: boolean,
  user?: UserProjection | boolean,
  userId?: boolean,
}
export type DeviceParam<P extends DeviceProjection> = T.ParamProjection<types.Device, DeviceProjection, P>

export type DeviceSortKeys = 'id' | 'name' | 'userId'
export type DeviceSort = T.OneKey<DeviceSortKeys, T.SortDirection>
export type DeviceRawSort = never

export type DeviceUpdate = {
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String'],
  'userId'?: types.Scalars['ID'] | null
}
export type DeviceRawUpdate = never

export type DeviceInsert = {
  id?: null | types.Scalars['ID'],
  name: types.Scalars['String'],
  userId?: null | types.Scalars['ID'],
}

type DeviceDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.Device, 'id', 'ID', DeviceFilter, DeviceRawFilter, DeviceRelations, DeviceProjection, DeviceSort, DeviceRawSort, DeviceInsert, DeviceUpdate, DeviceRawUpdate, DeviceExcludedFields, DeviceRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'device', DAOContext<MetadataType, OperationMetadataType>>
export type DeviceDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<DeviceDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryDeviceDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<DeviceDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class DeviceDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<DeviceDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends DeviceProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends DeviceProjection, P2 extends DeviceProjection>(p1: P1, p2: P2): T.SelectProjection<DeviceProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<DeviceProjection, P1, P2>
  }
  
  public constructor(params: DeviceDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: deviceSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'user', refFrom: 'userId', refTo: 'id', dao: 'user', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryDeviceDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<DeviceDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends DeviceProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends DeviceProjection, P2 extends DeviceProjection>(p1: P1, p2: P2): T.SelectProjection<DeviceProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<DeviceProjection, P1, P2>
  }
  
  public constructor(params: InMemoryDeviceDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: deviceSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'user', refFrom: 'userId', refTo: 'id', dao: 'user', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//------------------------------------- DOG --------------------------------------
//--------------------------------------------------------------------------------

export type DogExcludedFields = never
export type DogRelationFields = 'owner'

export function dogSchema(): T.Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'name': {
      scalar: 'String', 
      required: true
    },
    'ownerId': {
      scalar: 'ID', 
      required: true
    }
  }
}

type DogFilterFields = {
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'name'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'ownerId'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators
}
export type DogFilter = DogFilterFields & T.LogicalOperators<DogFilterFields | DogRawFilter>
export type DogRawFilter = never

export type DogRelations = Record<never, string>

export type DogProjection = {
  id?: boolean,
  name?: boolean,
  owner?: UserProjection | boolean,
  ownerId?: boolean,
}
export type DogParam<P extends DogProjection> = T.ParamProjection<types.Dog, DogProjection, P>

export type DogSortKeys = 'id' | 'name' | 'ownerId'
export type DogSort = T.OneKey<DogSortKeys, T.SortDirection>
export type DogRawSort = never

export type DogUpdate = {
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String'],
  'ownerId'?: types.Scalars['ID']
}
export type DogRawUpdate = never

export type DogInsert = {
  id?: null | types.Scalars['ID'],
  name: types.Scalars['String'],
  ownerId: types.Scalars['ID'],
}

type DogDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.Dog, 'id', 'ID', DogFilter, DogRawFilter, DogRelations, DogProjection, DogSort, DogRawSort, DogInsert, DogUpdate, DogRawUpdate, DogExcludedFields, DogRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'dog', DAOContext<MetadataType, OperationMetadataType>>
export type DogDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<DogDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryDogDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<DogDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class DogDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<DogDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends DogProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends DogProjection, P2 extends DogProjection>(p1: P1, p2: P2): T.SelectProjection<DogProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<DogProjection, P1, P2>
  }
  
  public constructor(params: DogDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: dogSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'owner', refFrom: 'ownerId', refTo: 'id', dao: 'user', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryDogDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<DogDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends DogProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends DogProjection, P2 extends DogProjection>(p1: P1, p2: P2): T.SelectProjection<DogProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<DogProjection, P1, P2>
  }
  
  public constructor(params: InMemoryDogDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: dogSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'owner', refFrom: 'ownerId', refTo: 'id', dao: 'user', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//------------------------------------ HOTEL -------------------------------------
//--------------------------------------------------------------------------------

export type HotelExcludedFields = never
export type HotelRelationFields = never

export function hotelSchema(): T.Schema<types.Scalars> {
  return {
    'audit': { embedded: auditableSchema(), required: true, defaultGenerationStrategy: 'middleware' },
    'id': {
      scalar: 'ID', 
      required: true, 
      alias: '_id'
    },
    'name': {
      scalar: 'String', 
      required: true
    }
  }
}

type HotelFilterFields = {
  'audit.createdBy'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'audit.createdOn'?: types.Scalars['Int'] | null | T.EqualityOperators<types.Scalars['Int']> | T.ElementOperators | T.QuantityOperators<types.Scalars['Int']>,
  'audit.deletedOn'?: types.Scalars['Int'] | null | T.EqualityOperators<types.Scalars['Int']> | T.ElementOperators | T.QuantityOperators<types.Scalars['Int']>,
  'audit.modifiedBy'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'audit.modifiedOn'?: types.Scalars['Int'] | null | T.EqualityOperators<types.Scalars['Int']> | T.ElementOperators | T.QuantityOperators<types.Scalars['Int']>,
  'audit.state'?: types.State | null | T.EqualityOperators<types.State> | T.ElementOperators | T.StringOperators,
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'name'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators
}
export type HotelFilter = HotelFilterFields & T.LogicalOperators<HotelFilterFields | HotelRawFilter>
export type HotelRawFilter = never

export type HotelRelations = Record<never, string>

export type HotelProjection = {
  audit?: {
    createdBy?: boolean,
    createdOn?: boolean,
    deletedOn?: boolean,
    modifiedBy?: boolean,
    modifiedOn?: boolean,
    state?: boolean,
    versions?: AuditProjection | boolean,
  } | boolean,
  id?: boolean,
  name?: boolean,
}
export type HotelParam<P extends HotelProjection> = T.ParamProjection<types.Hotel, HotelProjection, P>

export type HotelSortKeys = 'audit.createdBy' | 'audit.createdOn' | 'audit.deletedOn' | 'audit.modifiedBy' | 'audit.modifiedOn' | 'audit.state' | 'id' | 'name'
export type HotelSort = T.OneKey<HotelSortKeys, T.SortDirection>
export type HotelRawSort = never

export type HotelUpdate = {
  'audit'?: AuditableInsert,
  'audit.createdBy'?: types.Scalars['String'],
  'audit.createdOn'?: types.Scalars['Int'],
  'audit.deletedOn'?: types.Scalars['Int'] | null,
  'audit.modifiedBy'?: types.Scalars['String'],
  'audit.modifiedOn'?: types.Scalars['Int'],
  'audit.state'?: types.State,
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String']
}
export type HotelRawUpdate = never

export type HotelInsert = {
  audit?: null | AuditableInsert,
  name: types.Scalars['String'],
}

type HotelDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.Hotel, 'id', 'ID', HotelFilter, HotelRawFilter, HotelRelations, HotelProjection, HotelSort, HotelRawSort, HotelInsert, HotelUpdate, HotelRawUpdate, HotelExcludedFields, HotelRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'hotel', DAOContext<MetadataType, OperationMetadataType>>
export type HotelDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<HotelDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryHotelDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<HotelDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class HotelDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<HotelDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends HotelProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends HotelProjection, P2 extends HotelProjection>(p1: P1, p2: P2): T.SelectProjection<HotelProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<HotelProjection, P1, P2>
  }
  
  public constructor(params: HotelDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: hotelSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'audit.versions', refFrom: 'entityId', refTo: 'id', dao: 'audit', required: true }
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryHotelDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<HotelDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends HotelProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends HotelProjection, P2 extends HotelProjection>(p1: P1, p2: P2): T.SelectProjection<HotelProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<HotelProjection, P1, P2>
  }
  
  public constructor(params: InMemoryHotelDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: hotelSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'audit.versions', refFrom: 'entityId', refTo: 'id', dao: 'audit', required: true }
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//--------------------------------- MOCKEDENTITY ---------------------------------
//--------------------------------------------------------------------------------

export type MockedEntityExcludedFields = never
export type MockedEntityRelationFields = 'user'

export function mockedEntitySchema(): T.Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true, 
      alias: '_id'
    },
    'name': {
      scalar: 'String', 
      required: true
    },
    'userId': {
      scalar: 'ID', 
      required: true
    }
  }
}

type MockedEntityFilterFields = {
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'name'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'userId'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators
}
export type MockedEntityFilter = MockedEntityFilterFields & T.LogicalOperators<MockedEntityFilterFields | MockedEntityRawFilter>
export type MockedEntityRawFilter = never

export type MockedEntityRelations = Record<never, string>

export type MockedEntityProjection = {
  id?: boolean,
  name?: boolean,
  user?: UserProjection | boolean,
  userId?: boolean,
}
export type MockedEntityParam<P extends MockedEntityProjection> = T.ParamProjection<types.MockedEntity, MockedEntityProjection, P>

export type MockedEntitySortKeys = 'id' | 'name' | 'userId'
export type MockedEntitySort = T.OneKey<MockedEntitySortKeys, T.SortDirection>
export type MockedEntityRawSort = never

export type MockedEntityUpdate = {
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String'],
  'userId'?: types.Scalars['ID']
}
export type MockedEntityRawUpdate = never

export type MockedEntityInsert = {
  name: types.Scalars['String'],
  userId: types.Scalars['ID'],
}

type MockedEntityDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.MockedEntity, 'id', 'ID', MockedEntityFilter, MockedEntityRawFilter, MockedEntityRelations, MockedEntityProjection, MockedEntitySort, MockedEntityRawSort, MockedEntityInsert, MockedEntityUpdate, MockedEntityRawUpdate, MockedEntityExcludedFields, MockedEntityRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'mockedEntity', DAOContext<MetadataType, OperationMetadataType>>
export type MockedEntityDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<MockedEntityDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryMockedEntityDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<MockedEntityDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class MockedEntityDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<MockedEntityDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends MockedEntityProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends MockedEntityProjection, P2 extends MockedEntityProjection>(p1: P1, p2: P2): T.SelectProjection<MockedEntityProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<MockedEntityProjection, P1, P2>
  }
  
  public constructor(params: MockedEntityDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: mockedEntitySchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'user', refFrom: 'userId', refTo: 'id', dao: 'user', required: true }
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryMockedEntityDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<MockedEntityDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends MockedEntityProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends MockedEntityProjection, P2 extends MockedEntityProjection>(p1: P1, p2: P2): T.SelectProjection<MockedEntityProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<MockedEntityProjection, P1, P2>
  }
  
  public constructor(params: InMemoryMockedEntityDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: mockedEntitySchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'user', refFrom: 'userId', refTo: 'id', dao: 'user', required: true }
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//--------------------------------- ORGANIZATION ---------------------------------
//--------------------------------------------------------------------------------

export type OrganizationExcludedFields = 'computedName'
export type OrganizationRelationFields = never

export function organizationSchema(): T.Schema<types.Scalars> {
  return {
    'address': { embedded: addressSchema() },
    'id': {
      scalar: 'ID', 
      required: true
    },
    'name': {
      scalar: 'String', 
      required: true
    },
    'vatNumber': {
      scalar: 'String'
    }
  }
}

type OrganizationFilterFields = {
  'address.id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'name'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'vatNumber'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators
}
export type OrganizationFilter = OrganizationFilterFields & T.LogicalOperators<OrganizationFilterFields | OrganizationRawFilter>
export type OrganizationRawFilter = never

export type OrganizationRelations = Record<never, string>

export type OrganizationProjection = {
  address?: {
    cities?: CityProjection | boolean,
    id?: boolean,
  } | boolean,
  computedName?: boolean,
  id?: boolean,
  name?: boolean,
  vatNumber?: boolean,
}
export type OrganizationParam<P extends OrganizationProjection> = T.ParamProjection<types.Organization, OrganizationProjection, P>

export type OrganizationSortKeys = 'address.id' | 'id' | 'name' | 'vatNumber'
export type OrganizationSort = T.OneKey<OrganizationSortKeys, T.SortDirection>
export type OrganizationRawSort = never

export type OrganizationUpdate = {
  'address'?: AddressInsert | null,
  'address.id'?: types.Scalars['ID'],
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String'],
  'vatNumber'?: types.Scalars['String'] | null
}
export type OrganizationRawUpdate = never

export type OrganizationInsert = {
  address?: null | AddressInsert,
  id?: null | types.Scalars['ID'],
  name: types.Scalars['String'],
  vatNumber?: null | types.Scalars['String'],
}

type OrganizationDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.Organization, 'id', 'ID', OrganizationFilter, OrganizationRawFilter, OrganizationRelations, OrganizationProjection, OrganizationSort, OrganizationRawSort, OrganizationInsert, OrganizationUpdate, OrganizationRawUpdate, OrganizationExcludedFields, OrganizationRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'organization', DAOContext<MetadataType, OperationMetadataType>>
export type OrganizationDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<OrganizationDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryOrganizationDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<OrganizationDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class OrganizationDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<OrganizationDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends OrganizationProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends OrganizationProjection, P2 extends OrganizationProjection>(p1: P1, p2: P2): T.SelectProjection<OrganizationProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<OrganizationProjection, P1, P2>
  }
  
  public constructor(params: OrganizationDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: organizationSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'address.cities', refFrom: 'addressId', refTo: 'address.id', dao: 'city', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryOrganizationDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<OrganizationDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends OrganizationProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends OrganizationProjection, P2 extends OrganizationProjection>(p1: P1, p2: P2): T.SelectProjection<OrganizationProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<OrganizationProjection, P1, P2>
  }
  
  public constructor(params: InMemoryOrganizationDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: organizationSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'address.cities', refFrom: 'addressId', refTo: 'address.id', dao: 'city', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//------------------------------------- POST -------------------------------------
//--------------------------------------------------------------------------------

export type PostExcludedFields = never
export type PostRelationFields = 'author'

export function postSchema(): T.Schema<types.Scalars> {
  return {
    'authorId': {
      scalar: 'ID', 
      required: true, 
      alias: 'aId'
    },
    'body': {
      scalar: 'String'
    },
    'clicks': {
      scalar: 'Int'
    },
    'id': {
      scalar: 'ID', 
      required: true
    },
    'metadata': { embedded: postMetadataSchema() },
    'title': {
      scalar: 'String', 
      required: true
    },
    'views': {
      scalar: 'Int', 
      required: true
    }
  }
}

type PostFilterFields = {
  'authorId'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'body'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'clicks'?: types.Scalars['Int'] | null | T.EqualityOperators<types.Scalars['Int']> | T.ElementOperators | T.QuantityOperators<types.Scalars['Int']>,
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'metadata.region'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'metadata.visible'?: types.Scalars['Boolean'] | null | T.EqualityOperators<types.Scalars['Boolean']> | T.ElementOperators,
  'title'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'views'?: types.Scalars['Int'] | null | T.EqualityOperators<types.Scalars['Int']> | T.ElementOperators | T.QuantityOperators<types.Scalars['Int']>
}
export type PostFilter = PostFilterFields & T.LogicalOperators<PostFilterFields | PostRawFilter>
export type PostRawFilter = never

export type PostRelations = Record<never, string>

export type PostProjection = {
  author?: UserProjection | boolean,
  authorId?: boolean,
  body?: boolean,
  clicks?: boolean,
  id?: boolean,
  metadata?: {
    region?: boolean,
    visible?: boolean,
  } | boolean,
  title?: boolean,
  views?: boolean,
}
export type PostParam<P extends PostProjection> = T.ParamProjection<types.Post, PostProjection, P>

export type PostSortKeys = 'authorId' | 'body' | 'clicks' | 'id' | 'metadata.region' | 'metadata.visible' | 'title' | 'views'
export type PostSort = T.OneKey<PostSortKeys, T.SortDirection>
export type PostRawSort = never

export type PostUpdate = {
  'authorId'?: types.Scalars['ID'],
  'body'?: types.Scalars['String'] | null,
  'clicks'?: types.Scalars['Int'] | null,
  'id'?: types.Scalars['ID'],
  'metadata'?: PostMetadataInsert | null,
  'metadata.region'?: types.Scalars['String'],
  'metadata.visible'?: types.Scalars['Boolean'],
  'title'?: types.Scalars['String'],
  'views'?: types.Scalars['Int']
}
export type PostRawUpdate = never

export type PostInsert = {
  authorId: types.Scalars['ID'],
  body?: null | types.Scalars['String'],
  clicks?: null | types.Scalars['Int'],
  id?: null | types.Scalars['ID'],
  metadata?: null | PostMetadataInsert,
  title: types.Scalars['String'],
  views: types.Scalars['Int'],
}

type PostDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.Post, 'id', 'ID', PostFilter, PostRawFilter, PostRelations, PostProjection, PostSort, PostRawSort, PostInsert, PostUpdate, PostRawUpdate, PostExcludedFields, PostRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'post', DAOContext<MetadataType, OperationMetadataType>>
export type PostDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<PostDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryPostDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<PostDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class PostDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<PostDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends PostProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends PostProjection, P2 extends PostProjection>(p1: P1, p2: P2): T.SelectProjection<PostProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<PostProjection, P1, P2>
  }
  
  public constructor(params: PostDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: postSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'author', refFrom: 'authorId', refTo: 'id', dao: 'user', required: true }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryPostDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<PostDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends PostProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends PostProjection, P2 extends PostProjection>(p1: P1, p2: P2): T.SelectProjection<PostProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<PostProjection, P1, P2>
  }
  
  public constructor(params: InMemoryPostDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: postSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'author', refFrom: 'authorId', refTo: 'id', dao: 'user', required: true }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//--------------------------------- POSTMETADATA ---------------------------------
//--------------------------------------------------------------------------------

export function postMetadataSchema(): T.Schema<types.Scalars> {
  return {
    'region': {
      scalar: 'String', 
      required: true
    },
    'visible': {
      scalar: 'Boolean', 
      required: true
    }
  }
}

export type PostMetadataProjection = {
  region?: boolean,
  visible?: boolean,
}
export type PostMetadataParam<P extends PostMetadataProjection> = T.ParamProjection<types.PostMetadata, PostMetadataProjection, P>

export type PostMetadataInsert = {
  region: types.Scalars['String'],
  visible: types.Scalars['Boolean'],
}



//--------------------------------------------------------------------------------
//----------------------------------- POSTTYPE -----------------------------------
//--------------------------------------------------------------------------------

export type PostTypeExcludedFields = never
export type PostTypeRelationFields = never

export function postTypeSchema(): T.Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'name': {
      scalar: 'String', 
      required: true
    }
  }
}

type PostTypeFilterFields = {
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'name'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators
}
export type PostTypeFilter = PostTypeFilterFields & T.LogicalOperators<PostTypeFilterFields | PostTypeRawFilter>
export type PostTypeRawFilter = never

export type PostTypeRelations = Record<never, string>

export type PostTypeProjection = {
  id?: boolean,
  name?: boolean,
}
export type PostTypeParam<P extends PostTypeProjection> = T.ParamProjection<types.PostType, PostTypeProjection, P>

export type PostTypeSortKeys = 'id' | 'name'
export type PostTypeSort = T.OneKey<PostTypeSortKeys, T.SortDirection>
export type PostTypeRawSort = never

export type PostTypeUpdate = {
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String']
}
export type PostTypeRawUpdate = never

export type PostTypeInsert = {
  id: types.Scalars['ID'],
  name: types.Scalars['String'],
}

type PostTypeDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.PostType, 'id', 'ID', PostTypeFilter, PostTypeRawFilter, PostTypeRelations, PostTypeProjection, PostTypeSort, PostTypeRawSort, PostTypeInsert, PostTypeUpdate, PostTypeRawUpdate, PostTypeExcludedFields, PostTypeRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'postType', DAOContext<MetadataType, OperationMetadataType>>
export type PostTypeDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<PostTypeDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryPostTypeDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<PostTypeDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class PostTypeDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<PostTypeDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends PostTypeProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends PostTypeProjection, P2 extends PostTypeProjection>(p1: P1, p2: P2): T.SelectProjection<PostTypeProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<PostTypeProjection, P1, P2>
  }
  
  public constructor(params: PostTypeDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: postTypeSchema(), 
      relations: T.overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'user', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryPostTypeDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<PostTypeDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends PostTypeProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends PostTypeProjection, P2 extends PostTypeProjection>(p1: P1, p2: P2): T.SelectProjection<PostTypeProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<PostTypeProjection, P1, P2>
  }
  
  public constructor(params: InMemoryPostTypeDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: postTypeSchema(), 
      relations: T.overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'user', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//------------------------------------- USER -------------------------------------
//--------------------------------------------------------------------------------

export type UserExcludedFields = never
export type UserRelationFields = 'dogs' | 'friends'

export function userSchema(): T.Schema<types.Scalars> {
  return {
    'amount': {
      scalar: 'Decimal'
    },
    'amounts': {
      scalar: 'Decimal', 
      array: true, 
      alias: 'amounts'
    },
    'credentials': { embedded: usernamePasswordCredentialsSchema(), array: true },
    'embeddedPost': { embedded: postSchema() },
    'firstName': {
      scalar: 'String', 
      alias: 'name'
    },
    'friendsId': {
      scalar: 'ID', 
      array: true, 
      alias: 'fIds'
    },
    'id': {
      scalar: 'ID', 
      required: true, 
      alias: 'ID'
    },
    'lastName': {
      scalar: 'String'
    },
    'live': {
      scalar: 'Boolean', 
      required: true
    },
    'localization': {
      scalar: 'Coordinates'
    },
    'title': {
      scalar: 'LocalizedString'
    },
    'usernamePasswordCredentials': { embedded: usernamePasswordCredentialsSchema(), alias: 'cred' }
  }
}

type UserFilterFields = {
  'amount'?: types.Scalars['Decimal'] | null | T.EqualityOperators<types.Scalars['Decimal']> | T.ElementOperators,
  'amounts'?: types.Scalars['Decimal'][] | null | T.EqualityOperators<types.Scalars['Decimal'][]> | T.ElementOperators,
  'credentials.password'?: types.Scalars['Password'] | null | T.EqualityOperators<types.Scalars['Password']> | T.ElementOperators,
  'credentials.username'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'embeddedPost.authorId'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'embeddedPost.body'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'embeddedPost.clicks'?: types.Scalars['Int'] | null | T.EqualityOperators<types.Scalars['Int']> | T.ElementOperators | T.QuantityOperators<types.Scalars['Int']>,
  'embeddedPost.id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'embeddedPost.metadata.region'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'embeddedPost.metadata.visible'?: types.Scalars['Boolean'] | null | T.EqualityOperators<types.Scalars['Boolean']> | T.ElementOperators,
  'embeddedPost.title'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'embeddedPost.views'?: types.Scalars['Int'] | null | T.EqualityOperators<types.Scalars['Int']> | T.ElementOperators | T.QuantityOperators<types.Scalars['Int']>,
  'firstName'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'friendsId'?: types.Scalars['ID'][] | null | T.EqualityOperators<types.Scalars['ID'][]> | T.ElementOperators,
  'id'?: types.Scalars['ID'] | null | T.EqualityOperators<types.Scalars['ID']> | T.ElementOperators,
  'lastName'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators,
  'live'?: types.Scalars['Boolean'] | null | T.EqualityOperators<types.Scalars['Boolean']> | T.ElementOperators,
  'localization'?: types.Scalars['Coordinates'] | null | T.EqualityOperators<types.Scalars['Coordinates']> | T.ElementOperators,
  'title'?: types.Scalars['LocalizedString'] | null | T.EqualityOperators<types.Scalars['LocalizedString']> | T.ElementOperators,
  'usernamePasswordCredentials.password'?: types.Scalars['Password'] | null | T.EqualityOperators<types.Scalars['Password']> | T.ElementOperators,
  'usernamePasswordCredentials.username'?: types.Scalars['String'] | null | T.EqualityOperators<types.Scalars['String']> | T.ElementOperators | T.StringOperators
}
export type UserFilter = UserFilterFields & T.LogicalOperators<UserFilterFields | UserRawFilter>
export type UserRawFilter = never

export type UserRelations = {
  dogs?: {
    filter?: DogFilter
    sorts?: DogSort[] | DogRawSort
    skip?: number
    limit?: number
    relations?: DogRelations
  }
  friends?: {
    filter?: UserFilter
    sorts?: UserSort[] | UserRawSort
    skip?: number
    limit?: number
    relations?: UserRelations
  }
}

export type UserProjection = {
  amount?: boolean,
  amounts?: boolean,
  credentials?: {
    password?: boolean,
    username?: boolean,
  } | boolean,
  dogs?: DogProjection | boolean,
  embeddedPost?: {
    author?: UserProjection | boolean,
    authorId?: boolean,
    body?: boolean,
    clicks?: boolean,
    id?: boolean,
    metadata?: {
      region?: boolean,
      visible?: boolean,
    } | boolean,
    title?: boolean,
    views?: boolean,
  } | boolean,
  firstName?: boolean,
  friends?: UserProjection | boolean,
  friendsId?: boolean,
  id?: boolean,
  lastName?: boolean,
  live?: boolean,
  localization?: boolean,
  title?: boolean,
  usernamePasswordCredentials?: {
    password?: boolean,
    username?: boolean,
  } | boolean,
}
export type UserParam<P extends UserProjection> = T.ParamProjection<types.User, UserProjection, P>

export type UserSortKeys = 'amount' | 'amounts' | 'credentials.password' | 'credentials.username' | 'embeddedPost.authorId' | 'embeddedPost.body' | 'embeddedPost.clicks' | 'embeddedPost.id' | 'embeddedPost.metadata.region' | 'embeddedPost.metadata.visible' | 'embeddedPost.title' | 'embeddedPost.views' | 'firstName' | 'friendsId' | 'id' | 'lastName' | 'live' | 'localization' | 'title' | 'usernamePasswordCredentials.password' | 'usernamePasswordCredentials.username'
export type UserSort = T.OneKey<UserSortKeys, T.SortDirection>
export type UserRawSort = never

export type UserUpdate = {
  'amount'?: types.Scalars['Decimal'] | null,
  'amounts'?: types.Scalars['Decimal'][] | null,
  'credentials'?: (null | UsernamePasswordCredentialsInsert)[] | null,
  'embeddedPost'?: PostInsert | null,
  'embeddedPost.authorId'?: types.Scalars['ID'],
  'embeddedPost.body'?: types.Scalars['String'] | null,
  'embeddedPost.clicks'?: types.Scalars['Int'] | null,
  'embeddedPost.id'?: types.Scalars['ID'],
  'embeddedPost.metadata'?: PostMetadataInsert | null,
  'embeddedPost.metadata.region'?: types.Scalars['String'],
  'embeddedPost.metadata.visible'?: types.Scalars['Boolean'],
  'embeddedPost.title'?: types.Scalars['String'],
  'embeddedPost.views'?: types.Scalars['Int'],
  'firstName'?: types.Scalars['String'] | null,
  'friendsId'?: types.Scalars['ID'][] | null,
  'id'?: types.Scalars['ID'],
  'lastName'?: types.Scalars['String'] | null,
  'live'?: types.Scalars['Boolean'],
  'localization'?: types.Scalars['Coordinates'] | null,
  'title'?: types.Scalars['LocalizedString'] | null,
  'usernamePasswordCredentials'?: UsernamePasswordCredentialsInsert | null,
  'usernamePasswordCredentials.password'?: types.Scalars['Password'],
  'usernamePasswordCredentials.username'?: types.Scalars['String']
}
export type UserRawUpdate = never

export type UserInsert = {
  amount?: null | types.Scalars['Decimal'],
  amounts?: null | types.Scalars['Decimal'][],
  credentials?: null | (null | UsernamePasswordCredentialsInsert)[],
  embeddedPost?: null | PostInsert,
  firstName?: null | types.Scalars['String'],
  friendsId?: null | types.Scalars['ID'][],
  id?: null | types.Scalars['ID'],
  lastName?: null | types.Scalars['String'],
  live: types.Scalars['Boolean'],
  localization?: null | types.Scalars['Coordinates'],
  title?: null | types.Scalars['LocalizedString'],
  usernamePasswordCredentials?: null | UsernamePasswordCredentialsInsert,
}

type UserDAOGenerics<MetadataType, OperationMetadataType> = T.InMemoryDAOGenerics<types.User, 'id', 'ID', UserFilter, UserRawFilter, UserRelations, UserProjection, UserSort, UserRawSort, UserInsert, UserUpdate, UserRawUpdate, UserExcludedFields, UserRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'user', DAOContext<MetadataType, OperationMetadataType>>
export type UserDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<UserDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryUserDAOParams<MetadataType, OperationMetadataType> = Omit<T.InMemoryDAOParams<UserDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class UserDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<UserDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends UserProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends UserProjection, P2 extends UserProjection>(p1: P1, p2: P2): T.SelectProjection<UserProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<UserProjection, P1, P2>
  }
  
  public constructor(params: UserDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: userSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'dogs', refFrom: 'ownerId', refTo: 'id', dao: 'dog', required: false },
          { type: '1-1', reference: 'inner', field: 'embeddedPost.author', refFrom: 'embeddedPost.authorId', refTo: 'id', dao: 'user', required: true },
          { type: '1-n', reference: 'inner', field: 'friends', refFrom: 'friendsId', refTo: 'id', dao: 'user', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryUserDAO<MetadataType, OperationMetadataType> extends T.AbstractInMemoryDAO<UserDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends UserProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends UserProjection, P2 extends UserProjection>(p1: P1, p2: P2): T.SelectProjection<UserProjection, P1, P2> {
    return T.mergeProjections(p1, p2) as T.SelectProjection<UserProjection, P1, P2>
  }
  
  public constructor(params: InMemoryUserDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: userSchema(), 
      relations: T.overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'dogs', refFrom: 'ownerId', refTo: 'id', dao: 'dog', required: false },
          { type: '1-1', reference: 'inner', field: 'embeddedPost.author', refFrom: 'embeddedPost.authorId', refTo: 'id', dao: 'user', required: true },
          { type: '1-n', reference: 'inner', field: 'friends', refFrom: 'friendsId', refTo: 'id', dao: 'user', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//------------------------- USERNAMEPASSWORDCREDENTIALS --------------------------
//--------------------------------------------------------------------------------

export function usernamePasswordCredentialsSchema(): T.Schema<types.Scalars> {
  return {
    'password': {
      scalar: 'Password', 
      required: true, 
      alias: 'pwd'
    },
    'username': {
      scalar: 'String', 
      required: true, 
      alias: 'user'
    }
  }
}

export type UsernamePasswordCredentialsProjection = {
  password?: boolean,
  username?: boolean,
}
export type UsernamePasswordCredentialsParam<P extends UsernamePasswordCredentialsProjection> = T.ParamProjection<types.UsernamePasswordCredentials, UsernamePasswordCredentialsProjection, P>

export type UsernamePasswordCredentialsInsert = {
  password: types.Scalars['Password'],
  username: types.Scalars['String'],
}


export type DAOContextParams<MetadataType, OperationMetadataType, Permissions extends string, SecurityDomain extends object> = {
  metadata?: MetadataType
  middlewares?: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<any, MetadataType, OperationMetadataType>)[]
  overrides?: { 
    address?: Pick<Partial<AddressDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    audit?: Pick<Partial<AuditDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    city?: Pick<Partial<CityDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    defaultFieldsEntity?: Pick<Partial<DefaultFieldsEntityDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    device?: Pick<Partial<DeviceDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    dog?: Pick<Partial<DogDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    hotel?: Pick<Partial<HotelDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    mockedEntity?: Pick<Partial<MockedEntityDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    organization?: Pick<Partial<OrganizationDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    post?: Pick<Partial<PostDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    postType?: Pick<Partial<PostTypeDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    user?: Pick<Partial<UserDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>
  },
  scalars?: T.UserInputDriverDataTypeAdapterMap<types.Scalars, 'knex'>,
  log?: T.LogInput<'address' | 'audit' | 'city' | 'defaultFieldsEntity' | 'device' | 'dog' | 'hotel' | 'mockedEntity' | 'organization' | 'post' | 'postType' | 'user'>,
  security?: T.DAOContextSecurtyPolicy<DAOGenericsMap<MetadataType, OperationMetadataType>, OperationMetadataType, Permissions, SecurityDomain>
}

type DAOContextMiddleware<MetadataType = never, OperationMetadataType = never> = T.DAOMiddleware<DAOGenericsUnion<MetadataType, OperationMetadataType>>

export class DAOContext<MetadataType = never, OperationMetadataType = never, Permissions extends string = never, SecurityDomain extends object = never> extends T.AbstractDAOContext<never, never, types.Scalars, MetadataType>  {

  private _address: AddressDAO<MetadataType, OperationMetadataType> | undefined
  private _audit: AuditDAO<MetadataType, OperationMetadataType> | undefined
  private _city: CityDAO<MetadataType, OperationMetadataType> | undefined
  private _defaultFieldsEntity: DefaultFieldsEntityDAO<MetadataType, OperationMetadataType> | undefined
  private _device: DeviceDAO<MetadataType, OperationMetadataType> | undefined
  private _dog: DogDAO<MetadataType, OperationMetadataType> | undefined
  private _hotel: HotelDAO<MetadataType, OperationMetadataType> | undefined
  private _mockedEntity: MockedEntityDAO<MetadataType, OperationMetadataType> | undefined
  private _organization: OrganizationDAO<MetadataType, OperationMetadataType> | undefined
  private _post: PostDAO<MetadataType, OperationMetadataType> | undefined
  private _postType: PostTypeDAO<MetadataType, OperationMetadataType> | undefined
  private _user: UserDAO<MetadataType, OperationMetadataType> | undefined
  
  private params: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>
  
  private overrides: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>['overrides']
  
  private middlewares: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<any, MetadataType, OperationMetadataType>)[]
  
  private logger?: T.LogFunction<'address' | 'audit' | 'city' | 'defaultFieldsEntity' | 'device' | 'dog' | 'hotel' | 'mockedEntity' | 'organization' | 'post' | 'postType' | 'user'>
  
  get address(): AddressDAO<MetadataType, OperationMetadataType> {
    if(!this._address) {
      this._address = new AddressDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.address, middlewares: [...(this.overrides?.address?.middlewares || []), ...selectMiddleware('address', this.middlewares) as T.DAOMiddleware<AddressDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'address', logger: this.logger })
    }
    return this._address
  }
  get audit(): AuditDAO<MetadataType, OperationMetadataType> {
    if(!this._audit) {
      this._audit = new AuditDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.audit, middlewares: [...(this.overrides?.audit?.middlewares || []), ...selectMiddleware('audit', this.middlewares) as T.DAOMiddleware<AuditDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'audit', logger: this.logger })
    }
    return this._audit
  }
  get city(): CityDAO<MetadataType, OperationMetadataType> {
    if(!this._city) {
      this._city = new CityDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.city, middlewares: [...(this.overrides?.city?.middlewares || []), ...selectMiddleware('city', this.middlewares) as T.DAOMiddleware<CityDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'city', logger: this.logger })
    }
    return this._city
  }
  get defaultFieldsEntity(): DefaultFieldsEntityDAO<MetadataType, OperationMetadataType> {
    if(!this._defaultFieldsEntity) {
      this._defaultFieldsEntity = new DefaultFieldsEntityDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.defaultFieldsEntity, middlewares: [...(this.overrides?.defaultFieldsEntity?.middlewares || []), ...selectMiddleware('defaultFieldsEntity', this.middlewares) as T.DAOMiddleware<DefaultFieldsEntityDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'defaultFieldsEntity', logger: this.logger })
    }
    return this._defaultFieldsEntity
  }
  get device(): DeviceDAO<MetadataType, OperationMetadataType> {
    if(!this._device) {
      this._device = new DeviceDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.device, middlewares: [...(this.overrides?.device?.middlewares || []), ...selectMiddleware('device', this.middlewares) as T.DAOMiddleware<DeviceDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'device', logger: this.logger })
    }
    return this._device
  }
  get dog(): DogDAO<MetadataType, OperationMetadataType> {
    if(!this._dog) {
      this._dog = new DogDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.dog, middlewares: [...(this.overrides?.dog?.middlewares || []), ...selectMiddleware('dog', this.middlewares) as T.DAOMiddleware<DogDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'dog', logger: this.logger })
    }
    return this._dog
  }
  get hotel(): HotelDAO<MetadataType, OperationMetadataType> {
    if(!this._hotel) {
      this._hotel = new HotelDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.hotel, middlewares: [...(this.overrides?.hotel?.middlewares || []), ...selectMiddleware('hotel', this.middlewares) as T.DAOMiddleware<HotelDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'hotel', logger: this.logger })
    }
    return this._hotel
  }
  get mockedEntity(): MockedEntityDAO<MetadataType, OperationMetadataType> {
    if(!this._mockedEntity) {
      this._mockedEntity = new MockedEntityDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.mockedEntity, middlewares: [...(this.overrides?.mockedEntity?.middlewares || []), ...selectMiddleware('mockedEntity', this.middlewares) as T.DAOMiddleware<MockedEntityDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'mockedEntity', logger: this.logger })
    }
    return this._mockedEntity
  }
  get organization(): OrganizationDAO<MetadataType, OperationMetadataType> {
    if(!this._organization) {
      this._organization = new OrganizationDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.organization, middlewares: [...(this.overrides?.organization?.middlewares || []), ...selectMiddleware('organization', this.middlewares) as T.DAOMiddleware<OrganizationDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'organization', logger: this.logger })
    }
    return this._organization
  }
  get post(): PostDAO<MetadataType, OperationMetadataType> {
    if(!this._post) {
      this._post = new PostDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.post, middlewares: [...(this.overrides?.post?.middlewares || []), ...selectMiddleware('post', this.middlewares) as T.DAOMiddleware<PostDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'post', logger: this.logger })
    }
    return this._post
  }
  get postType(): PostTypeDAO<MetadataType, OperationMetadataType> {
    if(!this._postType) {
      this._postType = new PostTypeDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.postType, middlewares: [...(this.overrides?.postType?.middlewares || []), ...selectMiddleware('postType', this.middlewares) as T.DAOMiddleware<PostTypeDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'postType', logger: this.logger })
    }
    return this._postType
  }
  get user(): UserDAO<MetadataType, OperationMetadataType> {
    if(!this._user) {
      this._user = new UserDAO({ daoContext: this, datasource: null, metadata: this.metadata, ...this.overrides?.user, middlewares: [...(this.overrides?.user?.middlewares || []), ...selectMiddleware('user', this.middlewares) as T.DAOMiddleware<UserDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'user', logger: this.logger })
    }
    return this._user
  }
  
  constructor(params: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>) {
    super({
      ...params,
      scalars: params.scalars ? T.userInputDataTypeAdapterToDataTypeAdapter(params.scalars, ['Coordinates', 'Decimal', 'JSON', 'Live', 'LocalizedString', 'Password', 'ID', 'String', 'Boolean', 'Int', 'Float']) : undefined
    })
    this.overrides = params.overrides
    this.middlewares = params.middlewares || []
    this.logger = T.logInputToLogger(params.log)
    if(params.security && params.security.applySecurity !== false) {
      const securityMiddlewares = T.createSecurityPolicyMiddlewares(params.security)
      const defaultMiddleware = securityMiddlewares.others ? [groupMiddleware.excludes(Object.fromEntries(Object.keys(securityMiddlewares.middlewares).map(k => [k, true])) as any, securityMiddlewares.others as any)] : []
      this.middlewares = [...(params.middlewares ?? []), ...defaultMiddleware, ...Object.entries(securityMiddlewares.middlewares).map(([name, middleware]) => groupMiddleware.includes({[name]: true} as any, middleware as any))]
    }
    this.params = params
  }
  
  public async execQuery<T>(run: (dbs: {  }, entities: {  }) => Promise<T>): Promise<T> {
    return run({  }, {  })
  }
  
  protected clone(): this {
    return new DAOContext<MetadataType, OperationMetadataType, Permissions, SecurityDomain>(this.params) as this
  }
  
  

}


//--------------------------------------------------------------------------------
//------------------------------------- UTILS ------------------------------------
//--------------------------------------------------------------------------------

type DAOName = keyof DAOGenericsMap<never, never>
type DAOGenericsMap<MetadataType, OperationMetadataType> = {
  address: AddressDAOGenerics<MetadataType, OperationMetadataType>
  audit: AuditDAOGenerics<MetadataType, OperationMetadataType>
  city: CityDAOGenerics<MetadataType, OperationMetadataType>
  defaultFieldsEntity: DefaultFieldsEntityDAOGenerics<MetadataType, OperationMetadataType>
  device: DeviceDAOGenerics<MetadataType, OperationMetadataType>
  dog: DogDAOGenerics<MetadataType, OperationMetadataType>
  hotel: HotelDAOGenerics<MetadataType, OperationMetadataType>
  mockedEntity: MockedEntityDAOGenerics<MetadataType, OperationMetadataType>
  organization: OrganizationDAOGenerics<MetadataType, OperationMetadataType>
  post: PostDAOGenerics<MetadataType, OperationMetadataType>
  postType: PostTypeDAOGenerics<MetadataType, OperationMetadataType>
  user: UserDAOGenerics<MetadataType, OperationMetadataType>
}
type DAOGenericsUnion<MetadataType, OperationMetadataType> = DAOGenericsMap<MetadataType, OperationMetadataType>[DAOName]
type GroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> =
  | IncludeGroupMiddleware<N, MetadataType, OperationMetadataType>
  | ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType>
type IncludeGroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> = {
  include: { [K in N]: true }
  middleware: T.DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[N]>
}
type ExcludeGroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> = {
  exclude: { [K in N]: true }
  middleware: T.DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[Exclude<DAOName, N>]>
}
export const groupMiddleware = {
  includes<N extends DAOName, MetadataType, OperationMetadataType>(
    include: { [K in N]: true },
    middleware: T.DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[N]>,
  ): IncludeGroupMiddleware<N, MetadataType, OperationMetadataType> {
    return { include, middleware }
  },
  excludes<N extends DAOName, MetadataType, OperationMetadataType>(
    exclude: { [K in N]: true },
    middleware: ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType>['middleware'],
  ): ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType> {
    return { exclude, middleware }
  },
}
function selectMiddleware<MetadataType, OperationMetadataType>(
  name: DAOName,
  middlewares: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<DAOName, MetadataType, OperationMetadataType>)[],
): DAOContextMiddleware<MetadataType, OperationMetadataType>[] {
  return middlewares.flatMap((m) =>
    'include' in m
      ? Object.keys(m.include).includes(name)
        ? [m.middleware]
        : []
      : 'exclude' in m
      ? !Object.keys(m.exclude).includes(name)
        ? [m.middleware as DAOContextMiddleware<MetadataType, OperationMetadataType>]
        : []
      : [m],
  )
}
