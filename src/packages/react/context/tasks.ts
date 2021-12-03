import { useContext } from "react";
import { PageInfo } from "graphql-relay";
import { createContext } from "../hooks/useContextActions";
import {
  OwnTasksType,
  TaskPositionType,
  NewTaskType,
  UpdateTaskType,
  TaskFilterType,
} from "types/task";
import api, {
  CreateTaskMutation,
  DeleteTaskMutation,
  FetchMoreTasksQuery,
  GetTasksQuery,
  MoveTaskMutation,
  UpdateTaskMutation,
} from "api";
import * as optimistic from "features/Tasks/actions";

type TasksContextType = {
  tasks: OwnTasksType[];
  filter: TaskFilterType | null;
  error: Error | null;
  loading: boolean;
  meta: Pick<PageInfo, "hasNextPage" | "endCursor"> & {
    allTags: string[];
    tags: string[];
    totalCount: number;
    count: number;
  };
};

export const initialTasksState: TasksContextType = {
  tasks: [],
  error: null,
  loading: false,
  filter: null,
  meta: {
    allTags: [],
    tags: [],
    totalCount: 0,
    count: 0,
  },
};

type FetchMoreTasksParams = {
  after?: string;
  filter?: TaskFilterType | null;
};

export const tasksReducers = {
  getTasks: {
    promise: async (filter?: TaskFilterType | null) =>
      api.getTasks({ first: 20 }),
    pending: (state: TasksContextType) => {
      state.loading = true;
      return state;
    },
    fullfilled: (
      state: TasksContextType,
      result: GetTasksQuery,
      _filter?: TaskFilterType | null
    ) => {
      state.loading = false;
      state.error = null;
      state.tasks = result.tasks.edges.map((edge) => edge.node);
      state.meta = {
        ...result.tasks.pageInfo,
        allTags: result.allTaskTags.tags || [],
        totalCount: result.allTasks.totalCount,
        tags: result.taskTags.tags || [],
        count: result.tasks.totalCount,
      };
      return state;
    },
    rejected: (
      state: TasksContextType,
      error: Error,
      _filter?: TaskFilterType | null
    ) => {
      state.loading = false;
      state.error = error;
      return state;
    },
  },
  fetchMoreTasks: {
    promise: async ({ after, filter }: FetchMoreTasksParams) =>
      api.fetchMoreTasks({ after, first: 20 }),
    pending: (state: TasksContextType) => {
      state.loading = true;
      return state;
    },
    fullfilled: (
      state: TasksContextType,
      result: FetchMoreTasksQuery,
      _params: FetchMoreTasksParams
    ) => {
      state.tasks = state.tasks.concat(
        result.tasks.edges.map((edge) => edge.node)
      );
      return state;
    },
    rejected: (
      state: TasksContextType,
      error: Error,
      _params: FetchMoreTasksParams
    ) => {
      state.loading = false;
      state.error = error;
      return state;
    },
  },
  moveTask: {
    promise: async ({ id, index }: TaskPositionType) =>
      api.moveTask({ input: { id, index } }),
    pending: (state: TasksContextType, { id, index }: TaskPositionType) => {
      state.loading = true;
      state.tasks = optimistic.moveTask(state.tasks, id, index);
      return state;
    },
    fullfilled: (
      state: TasksContextType,
      result: MoveTaskMutation,
      _pos: TaskPositionType
    ) => {
      state.loading = false;
      state.error = null;
      // TODO: Moving inner tasks?
      for (const { id, index } of result.moveTask.tasks) {
        const target = state.tasks.find((t) => t.id === id);
        if (target) target.index = index;
      }
      state.tasks.sort(({ index }) => index);
      return state;
    },
    rejected: (
      state: TasksContextType,
      error: Error,
      _pos: TaskPositionType
    ) => {
      state.loading = false;
      state.error = error;
      return state;
    },
  },
  createTask: {
    promise: async (task: NewTaskType) => api.createTask({ input: task }),
    pending: (state: TasksContextType, task: NewTaskType) => {
      state.loading = true;
      state.tasks = optimistic.createTask(state.tasks, task);
      return state;
    },
    fullfilled: (
      state: TasksContextType,
      result: CreateTaskMutation,
      _task: NewTaskType
    ) => {
      const { task } = result.createTask;
      if (!task) return;
      state.loading = false;
      state.error = null;
      state.tasks.unshift(task);
      if (task.index === 1) for (const task of state.tasks) task.index++;
      return state;
    },
    rejected: (state: TasksContextType, error: Error, _task: NewTaskType) => {
      state.loading = false;
      state.error = error;
      return state;
    },
  },
  updateTask: {
    promise: async (task: UpdateTaskType) => api.updateTask({ input: task }),
    pending: (state: TasksContextType) => {
      state.loading = true;
      return state;
    },
    fullfilled: (
      state: TasksContextType,
      result: UpdateTaskMutation,
      _task: UpdateTaskType
    ) => {
      const { task } = result.updateTask;
      if (!task) return;
      state.loading = false;
      state.error = null;
      for (let i = 0; i < state.tasks.length; i++)
        if (state.tasks[i].id === task.id) {
          state.tasks[i] = { ...state.tasks[i], ...task };
          break;
        }
      return state;
    },
    rejected: (
      state: TasksContextType,
      error: Error,
      _task: UpdateTaskType
    ) => {
      state.loading = false;
      state.error = error;
      return state;
    },
  },
  deleteTask: {
    promise: async (id: string) => api.deleteTask({ input: { id } }),
    pending: (state: TasksContextType) => {
      state.loading = true;
      return state;
    },
    fullfilled: (
      state: TasksContextType,
      result: DeleteTaskMutation,
      id: string
    ) => {
      state.loading = false;
      state.error = null;

      const tasksMap = {};
      if (result.deleteTask.updated)
        for (const { id, index } of result.deleteTask.updated)
          tasksMap[id] = index;

      state.tasks = state.tasks.reduce((acc, task) => {
        if (task.id === id) return acc;
        const index = tasksMap[task.id];
        if (index) task.index = index;
        acc.push(task);
        return acc;
      }, []);

      return state;
    },
    rejected: (state: TasksContextType, error: Error, _id: string) => {
      state.loading = false;
      state.error = error;
      return state;
    },
  },
};

const TasksContext = createContext(initialTasksState, tasksReducers);

export const TasksProvider = TasksContext.Provider;

export const useTasks = () => useContext(TasksContext);
