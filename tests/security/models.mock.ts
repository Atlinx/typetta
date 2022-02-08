export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  Email: string;
  Password: string;
  Username: string;
};

export type Hotel = {
  __typename?: 'Hotel';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  totalCustomers: Scalars['Int'];
};

export const Permission = {
  MANAGE_HOTEL: 'MANAGE_HOTEL',
  MANAGE_RESERVATION: 'MANAGE_RESERVATION',
  MANAGE_ROOM: 'MANAGE_ROOM',
  READONLY_RESERVATION: 'READONLY_RESERVATION',
  READONLY_ROOM: 'READONLY_ROOM'
} as const;

export type Permission = typeof Permission[keyof typeof Permission];
export type Reservation = {
  __typename?: 'Reservation';
  hotelId: Scalars['ID'];
  id: Scalars['ID'];
  room?: Maybe<Room>;
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Role = {
  __typename?: 'Role';
  code: RoleCode;
  permissions: Array<Maybe<Permission>>;
};

export const RoleCode = {
  ADMIN: 'ADMIN',
  HOTEL_OWNER: 'HOTEL_OWNER'
} as const;

export type RoleCode = typeof RoleCode[keyof typeof RoleCode];
export type Room = {
  __typename?: 'Room';
  description: Scalars['String'];
  from: Scalars['Date'];
  hotel: Hotel;
  hotelId: Scalars['ID'];
  id: Scalars['ID'];
  to: Scalars['Date'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['Email'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  reservations: Array<Maybe<Reservation>>;
  roles: Array<UserRole>;
  totalPayments?: Maybe<Scalars['Int']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  hotelId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  role: Role;
  roleCode: RoleCode;
  userId: Scalars['ID'];
};
