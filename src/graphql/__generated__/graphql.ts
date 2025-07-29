/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddAttendeeInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Attendee = {
  __typename?: 'Attendee';
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreateEventInput = {
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  location: Scalars['String']['input'];
  title: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  staffCode: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  attendees: Array<Attendee>;
  createdBy: Scalars['String']['output'];
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topic: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttendee?: Maybe<Event>;
  createEvent?: Maybe<Event>;
  createUser?: Maybe<User>;
  deleteEvent?: Maybe<Scalars['String']['output']>;
  removeAttendee?: Maybe<Event>;
  signIn: Scalars['Boolean']['output'];
  updateEvent?: Maybe<Event>;
};


export type MutationAddAttendeeArgs = {
  eventId: Scalars['ID']['input'];
  input: AddAttendeeInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveAttendeeArgs = {
  eventId: Scalars['ID']['input'];
  input: AddAttendeeInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEventInput;
};

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  events: Array<Event>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};

export type UpdateEventInput = {
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  title: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  events: Array<Event>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};
