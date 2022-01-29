import { MockDAOContextParams, createMockedDAOContext, DAOMiddleware, Coordinates, LocalizedString, UserInputDriverDataTypeAdapterMap, Schema, AbstractDAOContext, LogicalOperators, QuantityOperators, EqualityOperators, GeospathialOperators, StringOperators, ElementOperators, OneKey, SortDirection, overrideRelations, userInputDataTypeAdapterToDataTypeAdapter, LogFunction, LogInput, logInputToLogger } from '../../src';
import * as types from './models.mock';
import { MongoDBDAOGenerics, MongoDBDAOParams, AbstractMongoDBDAO, inMemoryMongoDb } from '../../src';
import { Collection, Db, Filter, Sort, UpdateFilter, Document } from 'mongodb';

//--------------------------------------------------------------------------------
//------------------------------------ HOTEL -------------------------------------
//--------------------------------------------------------------------------------

export type HotelExcludedFields = never
export type HotelRelationFields = never

export const hotelSchema: Schema<types.Scalars> = {
  'description': {
    scalar: 'String'
  },
  'id': {
    scalar: 'ID', 
    required: true
  },
  'name': {
    scalar: 'String', 
    required: true
  },
  'totalCustomers': {
    scalar: 'Int', 
    required: true
  }
};

type HotelFilterFields = {
  'description'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'name'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'totalCustomers'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
};
export type HotelFilter = HotelFilterFields & LogicalOperators<HotelFilterFields>;
export type HotelRawFilter = () => Filter<Document>

export type HotelRelations = {

}

export type HotelProjection = {
  description?: boolean,
  id?: boolean,
  name?: boolean,
  totalCustomers?: boolean,
};

export type HotelSortKeys = 'description' | 'id' | 'name' | 'totalCustomers';
export type HotelSort = OneKey<HotelSortKeys, SortDirection>;
export type HotelRawSort = () => Sort

export type HotelUpdate = {
  'description'?: types.Scalars['String'] | null,
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String'],
  'totalCustomers'?: types.Scalars['Int']
};
export type HotelRawUpdate = () => UpdateFilter<Document>

export type HotelInsert = {
  description?: types.Scalars['String'],
  id?: types.Scalars['ID'],
  name: types.Scalars['String'],
  totalCustomers: types.Scalars['Int'],
};

type HotelDAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.Hotel, 'id', 'ID', 'generator', HotelFilter, HotelRawFilter, HotelRelations, HotelProjection, HotelSort, HotelRawSort, HotelInsert, HotelUpdate, HotelRawUpdate, HotelExcludedFields, HotelRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'hotel'>;
export type HotelDAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<HotelDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class HotelDAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<HotelDAOGenerics<MetadataType, OperationMetadataType>> {
  
  public constructor(params: HotelDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: hotelSchema, 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    });
  }
  
}



//--------------------------------------------------------------------------------
//--------------------------------- RESERVATION ----------------------------------
//--------------------------------------------------------------------------------

export type ReservationExcludedFields = never
export type ReservationRelationFields = 'room'

export const reservationSchema: Schema<types.Scalars> = {
  'hotelId': {
    scalar: 'ID', 
    required: true
  },
  'id': {
    scalar: 'ID', 
    required: true
  },
  'roomId': {
    scalar: 'ID', 
    required: true
  },
  'userId': {
    scalar: 'ID', 
    required: true
  }
};

type ReservationFilterFields = {
  'hotelId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'roomId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'userId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators
};
export type ReservationFilter = ReservationFilterFields & LogicalOperators<ReservationFilterFields>;
export type ReservationRawFilter = () => Filter<Document>

export type ReservationRelations = {

}

export type ReservationProjection = {
  hotelId?: boolean,
  id?: boolean,
  room?: RoomProjection | boolean,
  roomId?: boolean,
  userId?: boolean,
};

export type ReservationSortKeys = 'hotelId' | 'id' | 'roomId' | 'userId';
export type ReservationSort = OneKey<ReservationSortKeys, SortDirection>;
export type ReservationRawSort = () => Sort

export type ReservationUpdate = {
  'hotelId'?: types.Scalars['ID'],
  'id'?: types.Scalars['ID'],
  'roomId'?: types.Scalars['ID'],
  'userId'?: types.Scalars['ID']
};
export type ReservationRawUpdate = () => UpdateFilter<Document>

export type ReservationInsert = {
  hotelId: types.Scalars['ID'],
  id?: types.Scalars['ID'],
  roomId: types.Scalars['ID'],
  userId: types.Scalars['ID'],
};

type ReservationDAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.Reservation, 'id', 'ID', 'generator', ReservationFilter, ReservationRawFilter, ReservationRelations, ReservationProjection, ReservationSort, ReservationRawSort, ReservationInsert, ReservationUpdate, ReservationRawUpdate, ReservationExcludedFields, ReservationRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'reservation'>;
export type ReservationDAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<ReservationDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class ReservationDAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<ReservationDAOGenerics<MetadataType, OperationMetadataType>> {
  
  public constructor(params: ReservationDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: reservationSchema, 
      relations: overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'room', refFrom: 'roomId', refTo: 'id', dao: 'room', required: false }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    });
  }
  
}



//--------------------------------------------------------------------------------
//------------------------------------- ROOM -------------------------------------
//--------------------------------------------------------------------------------

export type RoomExcludedFields = never
export type RoomRelationFields = 'hotel'

export const roomSchema: Schema<types.Scalars> = {
  'description': {
    scalar: 'String', 
    required: true
  },
  'from': {
    scalar: 'Date', 
    required: true
  },
  'hotelId': {
    scalar: 'ID', 
    required: true
  },
  'id': {
    scalar: 'ID', 
    required: true
  },
  'to': {
    scalar: 'Date', 
    required: true
  }
};

type RoomFilterFields = {
  'description'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'from'?: types.Scalars['Date'] | null | EqualityOperators<types.Scalars['Date']> | ElementOperators,
  'hotelId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'to'?: types.Scalars['Date'] | null | EqualityOperators<types.Scalars['Date']> | ElementOperators
};
export type RoomFilter = RoomFilterFields & LogicalOperators<RoomFilterFields>;
export type RoomRawFilter = () => Filter<Document>

export type RoomRelations = {

}

export type RoomProjection = {
  description?: boolean,
  from?: boolean,
  hotel?: HotelProjection | boolean,
  hotelId?: boolean,
  id?: boolean,
  to?: boolean,
};

export type RoomSortKeys = 'description' | 'from' | 'hotelId' | 'id' | 'to';
export type RoomSort = OneKey<RoomSortKeys, SortDirection>;
export type RoomRawSort = () => Sort

export type RoomUpdate = {
  'description'?: types.Scalars['String'],
  'from'?: types.Scalars['Date'],
  'hotelId'?: types.Scalars['ID'],
  'id'?: types.Scalars['ID'],
  'to'?: types.Scalars['Date']
};
export type RoomRawUpdate = () => UpdateFilter<Document>

export type RoomInsert = {
  description: types.Scalars['String'],
  from: types.Scalars['Date'],
  hotelId: types.Scalars['ID'],
  id?: types.Scalars['ID'],
  to: types.Scalars['Date'],
};

type RoomDAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.Room, 'id', 'ID', 'generator', RoomFilter, RoomRawFilter, RoomRelations, RoomProjection, RoomSort, RoomRawSort, RoomInsert, RoomUpdate, RoomRawUpdate, RoomExcludedFields, RoomRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'room'>;
export type RoomDAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<RoomDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class RoomDAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<RoomDAOGenerics<MetadataType, OperationMetadataType>> {
  
  public constructor(params: RoomDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: roomSchema, 
      relations: overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'hotel', refFrom: 'hotelId', refTo: 'id', dao: 'hotel', required: true }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    });
  }
  
}



//--------------------------------------------------------------------------------
//------------------------------------- USER -------------------------------------
//--------------------------------------------------------------------------------

export type UserExcludedFields = never
export type UserRelationFields = 'reservations'

export const userSchema: Schema<types.Scalars> = {
  'email': {
    scalar: 'Email', 
    required: true
  },
  'firstName': {
    scalar: 'String'
  },
  'id': {
    scalar: 'ID', 
    required: true
  },
  'lastName': {
    scalar: 'String'
  },
  'roles': {
    embedded: {
      'all': {
        scalar: 'Boolean'
      },
      'hotelId': {
        scalar: 'ID'
      },
      'role': {
        scalar: 'Role', 
        required: true
      }
    }, 
    required: true, 
    array: true
  },
  'totalPayments': {
    scalar: 'Int'
  }
};

type UserFilterFields = {
  'email'?: types.Scalars['Email'] | null | EqualityOperators<types.Scalars['Email']> | ElementOperators,
  'firstName'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'lastName'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'roles.all'?: types.Scalars['Boolean'] | null | EqualityOperators<types.Scalars['Boolean']> | ElementOperators,
  'roles.hotelId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'roles.role'?: types.Scalars['Role'] | null | EqualityOperators<types.Scalars['Role']> | ElementOperators,
  'totalPayments'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
};
export type UserFilter = UserFilterFields & LogicalOperators<UserFilterFields>;
export type UserRawFilter = () => Filter<Document>

export type UserRelations = {
  reservations?: {
    filter?: ReservationFilter
    sorts?: ReservationSort[] | ReservationRawSort
    skip?: number
    limit?: number
    relations?: ReservationRelations
  }
}

export type UserProjection = {
  email?: boolean,
  firstName?: boolean,
  id?: boolean,
  lastName?: boolean,
  reservations?: ReservationProjection | boolean,
  roles?: {
    all?: boolean,
    hotelId?: boolean,
    role?: boolean,
  } | boolean,
  totalPayments?: boolean,
};

export type UserSortKeys = 'email' | 'firstName' | 'id' | 'lastName' | 'roles.all' | 'roles.hotelId' | 'roles.role' | 'totalPayments';
export type UserSort = OneKey<UserSortKeys, SortDirection>;
export type UserRawSort = () => Sort

export type UserUpdate = {
  'email'?: types.Scalars['Email'],
  'firstName'?: types.Scalars['String'] | null,
  'id'?: types.Scalars['ID'],
  'lastName'?: types.Scalars['String'] | null,
  'roles'?: types.HotelRole[],
  'roles.all'?: types.Scalars['Boolean'] | null,
  'roles.hotelId'?: types.Scalars['ID'] | null,
  'roles.role'?: types.Scalars['Role'],
  'totalPayments'?: types.Scalars['Int'] | null
};
export type UserRawUpdate = () => UpdateFilter<Document>

export type UserInsert = {
  email: types.Scalars['Email'],
  firstName?: types.Scalars['String'],
  id?: types.Scalars['ID'],
  lastName?: types.Scalars['String'],
  roles: types.HotelRole[],
  totalPayments?: types.Scalars['Int'],
};

type UserDAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.User, 'id', 'ID', 'generator', UserFilter, UserRawFilter, UserRelations, UserProjection, UserSort, UserRawSort, UserInsert, UserUpdate, UserRawUpdate, UserExcludedFields, UserRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'user'>;
export type UserDAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<UserDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class UserDAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<UserDAOGenerics<MetadataType, OperationMetadataType>> {
  
  public constructor(params: UserDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: userSchema, 
      relations: overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'reservations', refFrom: 'userId', refTo: 'id', dao: 'reservation', required: true }
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    });
  }
  
}

export type DAOContextParams<MetadataType, OperationMetadataType> = {
  metadata?: MetadataType
  middlewares?: DAOContextMiddleware<MetadataType, OperationMetadataType>[]
  overrides?: { 
    hotel?: Pick<Partial<HotelDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    reservation?: Pick<Partial<ReservationDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    room?: Pick<Partial<RoomDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    user?: Pick<Partial<UserDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>
  },
  mongo: Record<'default', Db>,
  scalars?: UserInputDriverDataTypeAdapterMap<types.Scalars, 'mongo'>,
  log?: LogInput<'hotel' | 'reservation' | 'room' | 'user'>
};

type DAOContextMiddleware<MetadataType = any, OperationMetadataType = any> = DAOMiddleware<HotelDAOGenerics<MetadataType, OperationMetadataType> | ReservationDAOGenerics<MetadataType, OperationMetadataType> | RoomDAOGenerics<MetadataType, OperationMetadataType> | UserDAOGenerics<MetadataType, OperationMetadataType>>

export class DAOContext<MetadataType = any, OperationMetadataType = any> extends AbstractDAOContext<types.Scalars, MetadataType>  {

  private _hotel: HotelDAO<MetadataType, OperationMetadataType> | undefined;
  private _reservation: ReservationDAO<MetadataType, OperationMetadataType> | undefined;
  private _room: RoomDAO<MetadataType, OperationMetadataType> | undefined;
  private _user: UserDAO<MetadataType, OperationMetadataType> | undefined;
  
  private overrides: DAOContextParams<MetadataType, OperationMetadataType>['overrides'];
  private mongo: Record<'default', Db>;
  
  private middlewares: DAOContextMiddleware<MetadataType, OperationMetadataType>[]
  
  private logger?: LogFunction<'hotel' | 'reservation' | 'room' | 'user'>
  
  get hotel() {
    if(!this._hotel) {
      this._hotel = new HotelDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.hotel, collection: this.mongo.default.collection('hotels'), middlewares: [...(this.overrides?.hotel?.middlewares || []), ...this.middlewares as DAOMiddleware<HotelDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'hotel', logger: this.logger });
    }
    return this._hotel;
  }
  get reservation() {
    if(!this._reservation) {
      this._reservation = new ReservationDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.reservation, collection: this.mongo.default.collection('reservations'), middlewares: [...(this.overrides?.reservation?.middlewares || []), ...this.middlewares as DAOMiddleware<ReservationDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'reservation', logger: this.logger });
    }
    return this._reservation;
  }
  get room() {
    if(!this._room) {
      this._room = new RoomDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.room, collection: this.mongo.default.collection('rooms'), middlewares: [...(this.overrides?.room?.middlewares || []), ...this.middlewares as DAOMiddleware<RoomDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'room', logger: this.logger });
    }
    return this._room;
  }
  get user() {
    if(!this._user) {
      this._user = new UserDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.user, collection: this.mongo.default.collection('users'), middlewares: [...(this.overrides?.user?.middlewares || []), ...this.middlewares as DAOMiddleware<UserDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'user', logger: this.logger });
    }
    return this._user;
  }
  
  constructor(params: DAOContextParams<MetadataType, OperationMetadataType>) {
    super({
      ...params,
      scalars: params.scalars ? userInputDataTypeAdapterToDataTypeAdapter(params.scalars, ['Date', 'Email', 'Password', 'Username', 'ID', 'String', 'Boolean', 'Int', 'Float']) : undefined
    })
    this.overrides = params.overrides
    this.mongo = params.mongo
    this.middlewares = params.middlewares || []
    this.logger = logInputToLogger(params.log)
  }
  
  public async execQuery<T>(run: (dbs: { mongo: Record<'default', Db> }, entities: { hotel: Collection<Document>; reservation: Collection<Document>; room: Collection<Document>; user: Collection<Document> }) => Promise<T>): Promise<T> {
    return run({ mongo: this.mongo }, { hotel: this.mongo.default.collection('hotels'), reservation: this.mongo.default.collection('reservations'), room: this.mongo.default.collection('rooms'), user: this.mongo.default.collection('users') })
  }
  
  

}

export async function mockedDAOContext<MetadataType = any, OperationMetadataType = any>(params: MockDAOContextParams<DAOContextParams<MetadataType, OperationMetadataType>>) {
  const newParams = await createMockedDAOContext<DAOContextParams<MetadataType, OperationMetadataType>>(params, ['default'], [])
  return new DAOContext(newParams)
}