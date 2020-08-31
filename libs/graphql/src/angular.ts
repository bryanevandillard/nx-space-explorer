import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type Launch = {
  __typename?: 'Launch';
  id: Scalars['ID'];
  site?: Maybe<Scalars['String']>;
  mission?: Maybe<Mission>;
  rocket?: Maybe<Rocket>;
  isBooked?: Maybe<Scalars['Boolean']>;
};

export type Rocket = {
  __typename?: 'Rocket';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Mission = {
  __typename?: 'Mission';
  name?: Maybe<Scalars['String']>;
  missionPatch?: Maybe<Scalars['String']>;
};


export type MissionMissionPatchArgs = {
  size?: Maybe<PatchSize>;
};

export type LaunchConnection = {
  __typename?: 'LaunchConnection';
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
  launches: Array<Maybe<Launch>>;
};

export enum PatchSize {
  Small = 'SMALL',
  Large = 'LARGE'
}

export type Query = {
  __typename?: 'Query';
  launch?: Maybe<Launch>;
  launches: LaunchConnection;
  me?: Maybe<User>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID'];
};


export type QueryLaunchesArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  trips?: Maybe<Array<Maybe<Launch>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Scalars['String']>;
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
};


export type MutationBookTripsArgs = {
  launchIds: Array<Maybe<Scalars['ID']>>;
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID'];
};

export type TripUpdateResponse = {
  __typename?: 'TripUpdateResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  launches?: Maybe<Array<Maybe<Launch>>>;
};

export type LaunchResultFragment = (
  { __typename?: 'Launch' }
  & Pick<Launch, 'id' | 'site'>
  & { rocket?: Maybe<(
    { __typename?: 'Rocket' }
    & Pick<Rocket, 'id' | 'name' | 'type'>
  )> }
);

export type GetLaunchesQueryVariables = Exact<{
  size?: Maybe<PatchSize>;
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetLaunchesQuery = (
  { __typename?: 'Query' }
  & { launches: (
    { __typename?: 'LaunchConnection' }
    & Pick<LaunchConnection, 'hasMore' | 'cursor'>
    & { launches: Array<Maybe<(
      { __typename?: 'Launch' }
      & { mission?: Maybe<(
        { __typename?: 'Mission' }
        & Pick<Mission, 'name' | 'missionPatch'>
      )> }
      & LaunchResultFragment
    )>> }
  ) }
);

export type GetLaunchQueryVariables = Exact<{
  id: Scalars['ID'];
  size?: Maybe<PatchSize>;
}>;


export type GetLaunchQuery = (
  { __typename?: 'Query' }
  & { launch?: Maybe<(
    { __typename?: 'Launch' }
    & { mission?: Maybe<(
      { __typename?: 'Mission' }
      & Pick<Mission, 'name' | 'missionPatch'>
    )> }
    & LaunchResultFragment
  )> }
);

export type UserResultFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email'>
);

export type MyTripsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTripsQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { trips?: Maybe<Array<Maybe<(
      { __typename?: 'Launch' }
      & LaunchResultFragment
    )>>> }
    & UserResultFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export const LaunchResultFragmentDoc = gql`
    fragment LaunchResult on Launch {
  id
  site
  rocket {
    id
    name
    type
  }
}
    `;
export const UserResultFragmentDoc = gql`
    fragment UserResult on User {
  id
  email
}
    `;
export const GetLaunchesDocument = gql`
    query GetLaunches($size: PatchSize, $cursor: String) {
  launches(cursor: $cursor) {
    hasMore
    cursor
    launches {
      ...LaunchResult
      mission {
        name
        missionPatch(size: $size)
      }
    }
  }
}
    ${LaunchResultFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLaunchesGQL extends Apollo.Query<GetLaunchesQuery, GetLaunchesQueryVariables> {
    document = GetLaunchesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetLaunchDocument = gql`
    query GetLaunch($id: ID!, $size: PatchSize) {
  launch(id: $id) {
    ...LaunchResult
    mission {
      name
      missionPatch(size: $size)
    }
  }
}
    ${LaunchResultFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLaunchGQL extends Apollo.Query<GetLaunchQuery, GetLaunchQueryVariables> {
    document = GetLaunchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MyTripsDocument = gql`
    query MyTrips {
  me {
    ...UserResult
    trips {
      ...LaunchResult
    }
  }
}
    ${UserResultFragmentDoc}
${LaunchResultFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MyTripsGQL extends Apollo.Query<MyTripsQuery, MyTripsQueryVariables> {
    document = MyTripsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation Login($email: String!) {
  login(email: $email)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }