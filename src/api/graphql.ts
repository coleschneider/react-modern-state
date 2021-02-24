import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  /** Fetches an object given its global ID. */
  node?: Maybe<Node>;
  /** Fetches objects given their global IDs. */
  nodes: Array<Maybe<Node>>;
  tasks: TaskConnection;
  task: Task;
  taskTags: TaskTagsPayload;
  me?: Maybe<User>;
  users: UserConnection;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryTasksArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTaskArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** An object with a global ID. */
export type Node = {
  /** The global ID of the object. */
  id: Scalars['ID'];
};

export type TaskConnection = {
  __typename?: 'TaskConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TaskEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

export type TaskEdge = {
  __typename?: 'TaskEdge';
  /** The item at the end of the edge. */
  node: Task;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  color?: Maybe<TaskColor>;
  startDate?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  remindMeAt?: Maybe<Scalars['DateTime']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  index: Scalars['Float'];
  user: User;
  parent: Task;
  subtasks?: Maybe<Array<Task>>;
};

export enum TaskColor {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
  Purple = 'Purple',
  Pink = 'Pink',
  Indigo = 'Indigo',
  Cyan = 'Cyan',
  Teal = 'Teal',
  Lime = 'Lime',
  Amber = 'Amber',
  Orange = 'Orange',
  Brown = 'Brown',
  Grey = 'Grey'
}


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  tasks: Array<Task>;
  email: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating backwards, are there more items? */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  /** When paginating forwards, are there more items? */
  hasNextPage?: Maybe<Scalars['Boolean']>;
};

export type TaskTagsPayload = {
  __typename?: 'TaskTagsPayload';
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** The item at the end of the edge. */
  node: User;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  moveTask: TasksPayload;
  toggleTask: TaskPayload;
  createTask: TaskPayload;
  updateTask: TaskPayload;
  deleteTask: DeleteTaskPayload;
};


export type MutationMoveTaskArgs = {
  input: MoveTaskInput;
};


export type MutationToggleTaskArgs = {
  input: ToggleTaskInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


export type MutationDeleteTaskArgs = {
  input: TaskIdInput;
};

export type TasksPayload = {
  __typename?: 'TasksPayload';
  tasks?: Maybe<Array<Task>>;
};

export type MoveTaskInput = {
  id: Scalars['ID'];
  index: Scalars['Float'];
};

export type TaskPayload = {
  __typename?: 'TaskPayload';
  task?: Maybe<Task>;
};

export type ToggleTaskInput = {
  id: Scalars['ID'];
  completed: Scalars['Boolean'];
};

export type CreateTaskInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  color?: Maybe<TaskColor>;
  startDate?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  remindMeAt?: Maybe<Scalars['DateTime']>;
  parentId?: Maybe<Scalars['ID']>;
};

export type UpdateTaskInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  color?: Maybe<TaskColor>;
  startDate?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  remindMeAt?: Maybe<Scalars['DateTime']>;
  completedAt?: Maybe<Scalars['DateTime']>;
};

export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  deleted?: Maybe<Task>;
  updated?: Maybe<Array<Task>>;
};

export type TaskIdInput = {
  id: Scalars['ID'];
};

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'TaskPayload' }
    & { task?: Maybe<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title' | 'description' | 'tags' | 'color' | 'startDate' | 'dueDate' | 'remindMeAt' | 'completedAt' | 'index'>
    )> }
  ) }
);

export type DeleteTaskMutationVariables = Exact<{
  input: TaskIdInput;
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deleteTask: (
    { __typename?: 'DeleteTaskPayload' }
    & { updated?: Maybe<Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'index'>
    )>> }
  ) }
);

export type FetchMoreTasksQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type FetchMoreTasksQuery = (
  { __typename?: 'Query' }
  & { tasks: (
    { __typename?: 'TaskConnection' }
    & Pick<TaskConnection, 'totalCount'>
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TaskEdge' }
      & { node: (
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'title' | 'description' | 'tags' | 'color' | 'startDate' | 'dueDate' | 'remindMeAt' | 'completedAt' | 'index'>
      ) }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
    ) }
  ) }
);

export type GetTasksQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
}>;


export type GetTasksQuery = (
  { __typename?: 'Query' }
  & { tasks: (
    { __typename?: 'TaskConnection' }
    & Pick<TaskConnection, 'totalCount'>
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TaskEdge' }
      & { node: (
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'title' | 'description' | 'tags' | 'color' | 'startDate' | 'dueDate' | 'remindMeAt' | 'completedAt' | 'index'>
      ) }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
    ) }
  ), taskTags: (
    { __typename?: 'TaskTagsPayload' }
    & Pick<TaskTagsPayload, 'tags'>
  ) }
);

export type MoveTaskMutationVariables = Exact<{
  input: MoveTaskInput;
}>;


export type MoveTaskMutation = (
  { __typename?: 'Mutation' }
  & { moveTask: (
    { __typename?: 'TasksPayload' }
    & { tasks?: Maybe<Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'index'>
    )>> }
  ) }
);

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'TaskPayload' }
    & { task?: Maybe<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title' | 'description' | 'tags' | 'color' | 'startDate' | 'dueDate' | 'remindMeAt' | 'completedAt' | 'index'>
    )> }
  ) }
);


export const CreateTaskDocument = gql`
    mutation createTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    task {
      id
      title
      description
      tags
      color
      startDate
      dueDate
      remindMeAt
      completedAt
      index
    }
  }
}
    `;
export const DeleteTaskDocument = gql`
    mutation deleteTask($input: TaskIdInput!) {
  deleteTask(input: $input) {
    updated {
      id
      index
    }
  }
}
    `;
export const FetchMoreTasksDocument = gql`
    query fetchMoreTasks($after: String, $first: Int) {
  tasks(after: $after, first: $first) {
    edges {
      node {
        id
        title
        description
        tags
        color
        startDate
        dueDate
        remindMeAt
        completedAt
        index
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const GetTasksDocument = gql`
    query getTasks($first: Int) {
  tasks(first: $first) {
    edges {
      node {
        id
        title
        description
        tags
        color
        startDate
        dueDate
        remindMeAt
        completedAt
        index
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  taskTags {
    tags
  }
}
    `;
export const MoveTaskDocument = gql`
    mutation moveTask($input: MoveTaskInput!) {
  moveTask(input: $input) {
    tasks {
      id
      index
    }
  }
}
    `;
export const UpdateTaskDocument = gql`
    mutation updateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    task {
      id
      title
      description
      tags
      color
      startDate
      dueDate
      remindMeAt
      completedAt
      index
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createTask(variables: CreateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTaskMutation> {
      return withWrapper(() => client.request<CreateTaskMutation>(print(CreateTaskDocument), variables, requestHeaders));
    },
    deleteTask(variables: DeleteTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTaskMutation> {
      return withWrapper(() => client.request<DeleteTaskMutation>(print(DeleteTaskDocument), variables, requestHeaders));
    },
    fetchMoreTasks(variables?: FetchMoreTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FetchMoreTasksQuery> {
      return withWrapper(() => client.request<FetchMoreTasksQuery>(print(FetchMoreTasksDocument), variables, requestHeaders));
    },
    getTasks(variables?: GetTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksQuery> {
      return withWrapper(() => client.request<GetTasksQuery>(print(GetTasksDocument), variables, requestHeaders));
    },
    moveTask(variables: MoveTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MoveTaskMutation> {
      return withWrapper(() => client.request<MoveTaskMutation>(print(MoveTaskDocument), variables, requestHeaders));
    },
    updateTask(variables: UpdateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTaskMutation> {
      return withWrapper(() => client.request<UpdateTaskMutation>(print(UpdateTaskDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;