import BigNumber from "bignumber.js";
import {Coordinates} from "@twinlogix/tl-commons";
import {LocalizedString} from "@twinlogix/tl-commons";
import { KnexJSDataTypeAdapterMap, MongoDBDataTypeAdapterMap, MongoDBDAOParams, KnexJsDAOParams, Schema, DAOAssociationType, DAOAssociationReference, AbstractMongoDBDAO, AbstractKnexJsDAO, AbstractDAOContext, LogicalOperators, QuantityOperators, EqualityOperators, GeospathialOperators, StringOperators, ElementOperators, ArrayOperators, OneKey, SortDirection, overrideAssociations } from '@twinlogix/typetta';
import * as types from './models.mock';
import { Db } from 'mongodb';
import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid'

//--------------------------------------------------------------------------------
//------------------------------------- POST -------------------------------------
//--------------------------------------------------------------------------------

export type PostExcludedFields = never

export const postSchema : Schema<types.Scalars>= {
  'authorId': { scalar: 'ID', required: true},
  'body': { scalar: 'String'},
  'createdAt': { scalar: 'DateTime', required: true},
  'id': { scalar: 'ID', required: true},
  'title': { scalar: 'String', required: true},
  'views': { scalar: 'Int', required: true}
};

type PostFilterFields = {
  'authorId'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'body'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'createdAt'?: Date | null | EqualityOperators<Date> | ElementOperators | QuantityOperators<Date>,
  'id'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'title'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'views'?: number | null | EqualityOperators<number> | ElementOperators | QuantityOperators<number>
};
export type PostFilter = PostFilterFields & LogicalOperators<PostFilterFields>;

export type PostProjection = {
  author?: UserProjection | boolean,
  authorId?: boolean,
  body?: boolean,
  createdAt?: boolean,
  id?: boolean,
  title?: boolean,
  views?: boolean,
};

export type PostSortKeys = 
  'authorId'|
  'body'|
  'createdAt'|
  'id'|
  'title'|
  'views';
export type PostSort = OneKey<PostSortKeys, SortDirection>;

export type PostUpdate = {
  'authorId'?: string,
  'body'?: string | null,
  'createdAt'?: Date,
  'id'?: string,
  'title'?: string,
  'views'?: number
};

type PostDAOAllParams = KnexJsDAOParams<types.Post, 'id', string, true, PostFilter, PostProjection, PostUpdate, PostExcludedFields, PostSort, { SQL?: any } & { test: string }, types.Scalars>;
export type PostDAOParams = Omit<PostDAOAllParams, 'idField' | 'schema'> & Partial<Pick<PostDAOAllParams, 'idField' | 'schema'>>;

export class PostDAO extends AbstractKnexJsDAO<types.Post, 'id', string, true, PostFilter, PostProjection, PostSort, PostUpdate, PostExcludedFields, { SQL?: any } & { test: string }, types.Scalars> {
  
  public constructor(params: PostDAOParams){
    super({   
      ...params, 
      idField: 'id', 
      schema: postSchema, 
      associations: overrideAssociations(
        [
          { type: DAOAssociationType.ONE_TO_ONE, reference: DAOAssociationReference.INNER, field: 'author', refFrom: 'authorId', refTo: 'id', dao: 'user' }
        ]
      ), 
      idGenerator: () => uuidv4() 
    });
  }
  
}



//--------------------------------------------------------------------------------
//------------------------------------- USER -------------------------------------
//--------------------------------------------------------------------------------

export type UserExcludedFields = never

export const userSchema : Schema<types.Scalars>= {
  'createdAt': { scalar: 'DateTime', required: true},
  'credentials': {
    embedded: {
      'password': { scalar: 'Password'},
      'username': { scalar: 'String'}
    }
    , required: true
  },
  'email': { scalar: 'String'},
  'firstName': { scalar: 'String'},
  'id': { scalar: 'ID', required: true},
  'lastName': { scalar: 'String'}
};

type UserFilterFields = {
  'createdAt'?: Date | null | EqualityOperators<Date> | ElementOperators | QuantityOperators<Date>,
  'credentials.password'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'credentials.username'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'email'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'firstName'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'id'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators,
  'lastName'?: string | null | EqualityOperators<string> | ElementOperators | StringOperators
};
export type UserFilter = UserFilterFields & LogicalOperators<UserFilterFields>;

export type UserProjection = {
  createdAt?: boolean,
  credentials?: {
    password?: boolean,
    username?: boolean,
  } | boolean,
  email?: boolean,
  firstName?: boolean,
  id?: boolean,
  lastName?: boolean,
  posts?: PostProjection | boolean,
};

export type UserSortKeys = 
  'createdAt'|
  'credentials.password'|
  'credentials.username'|
  'email'|
  'firstName'|
  'id'|
  'lastName';
export type UserSort = OneKey<UserSortKeys, SortDirection>;

export type UserUpdate = {
  'createdAt'?: Date,
  'credentials'?: types.Credentials,
  'credentials.password'?: string | null,
  'credentials.username'?: string | null,
  'email'?: string | null,
  'firstName'?: string | null,
  'id'?: string,
  'lastName'?: string | null
};

type UserDAOAllParams = KnexJsDAOParams<types.User, 'id', string, true, UserFilter, UserProjection, UserUpdate, UserExcludedFields, UserSort, { SQL?: any } & { test: string }, types.Scalars>;
export type UserDAOParams = Omit<UserDAOAllParams, 'idField' | 'schema'> & Partial<Pick<UserDAOAllParams, 'idField' | 'schema'>>;

export class UserDAO extends AbstractKnexJsDAO<types.User, 'id', string, true, UserFilter, UserProjection, UserSort, UserUpdate, UserExcludedFields, { SQL?: any } & { test: string }, types.Scalars> {
  
  public constructor(params: UserDAOParams){
    super({   
      ...params, 
      idField: 'id', 
      schema: userSchema, 
      associations: overrideAssociations(
        [
          { type: DAOAssociationType.ONE_TO_MANY, reference: DAOAssociationReference.FOREIGN, field: 'posts', refFrom: 'authorId', refTo: 'id', dao: 'post' }
        ]
      ), 
      idGenerator: () => uuidv4() 
    });
  }
  
}

export type DAOContextParams = {
  daoOverrides?: { 
    post?: Partial<PostDAOParams>,
    user?: Partial<UserDAOParams>
  },
  knex: Knex,
  adapters?: { knexjs?: KnexJSDataTypeAdapterMap<types.Scalars>; mongodb?: MongoDBDataTypeAdapterMap<types.Scalars> }
};

export class DAOContext extends AbstractDAOContext {

  private _post: PostDAO | undefined;
  private _user: UserDAO | undefined;
  
  private daoOverrides: DAOContextParams['daoOverrides'];
  private knex: Knex | undefined;
  
  get post() {
    if(!this._post) {
      this._post = new PostDAO({ daoContext: this, ...this.daoOverrides?.post, knex: this.knex!, tableName: 'posts' });
    }
    return this._post;
  }
  get user() {
    if(!this._user) {
      this._user = new UserDAO({ daoContext: this, ...this.daoOverrides?.user, knex: this.knex!, tableName: 'users' });
    }
    return this._user;
  }
  
  constructor(options?: DAOContextParams) {
    super(options?.adapters)
    this.daoOverrides = options?.daoOverrides
    this.knex = options?.knex;
  }

}