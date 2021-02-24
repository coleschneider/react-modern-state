import { useContext } from "react";
import { PageInfo } from "graphql-relay";
import { createContext } from "../hooks/useContextActions";
import {
  OwnTasksType,
  TaskPositionType,
  NewTaskType,
  UpdateTaskType,
} from "types/task";
import api, {
  CreateTaskMutation,
  DeleteTaskMutation,
  FetchMoreTasksQuery,
  GetTasksQuery,
  MoveTaskMutation,
  UpdateTaskMutation,
} from "api";

type TasksContextType = {
  tasks: OwnTasksType[];
  pageInfo: Pick<PageInfo, "hasNextPage" | "endCursor">;
  tags: string[];
  error: Error | null;
  loading: boolean;
};

export const initialTasksState: TasksContextType = {
  tasks: [],
  pageInfo: {},
  tags: [],
  error: null,
  loading: false,
};

export const tasksReducers = {
  getTasks: {
    promise: async () => api.getTasks({ first: 20 }),
    pending: (state: TasksContextType) => {
      state.loading = true;
      return state;
    },
    fullfilled: (state: TasksContextType, result: GetTasksQuery) => {
      state.loading = false;
      state.error = null;
      state.tasks = result.tasks.edges.map((edge) => edge.node);
      state.pageInfo = result.tasks.pageInfo;
      state.tags = result.taskTags.tags;
      return state;
    },
    rejected: (state: TasksContextType, error: Error) => {
      state.loading = false;
      state.error = error;
      return state;
    },
  },
  fetchMoreTasks: {
    promise: async (after: string) => api.fetchMoreTasks({ first: 20, after }),
    pending: (state: TasksContextType) => {
      state.loading = true;
      return state;
    },
    fullfilled: (
      state: TasksContextType,
      result: FetchMoreTasksQuery,
      _after: string
    ) => {
      state.loading = false;
      state.error = null;
      state.tasks = state.tasks.concat(
        result.tasks.edges.map((edge) => edge.node)
      );
      state.pageInfo = result.tasks.pageInfo;
      return state;
    },
    rejected: (state: TasksContextType, error: Error, _after: string) => {
      state.loading = false;
      state.error = error;
      return state;
    },
  },
  moveTask: {
    promise: async ({ id, index }: TaskPositionType) =>
      api.moveTask({ input: { id, index } }),
    pending: (state: TasksContextType) => {
      state.loading = true;
      return state;
    },
    fullfilled: (
      state: TasksContextType,
      result: MoveTaskMutation,
      _pos: TaskPositionType
    ) => {
      state.loading = false;
      state.error = null;
      for (const { id, index } of result.moveTask.tasks) {
        const target = state.tasks.find((t) => t.id === id);
        if (target) target.index = index;
      }
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
    pending: (state: TasksContextType) => {
      state.loading = true;
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
