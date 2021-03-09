import { NewTaskType, UpdateTaskType, TaskFilterType } from "types/task";
import { TaskItemProps } from "../TaskItem";

export type TasksListEvents = {
  fetchTasks: (filter?: TaskFilterType | null) => void;
  fetchMoreTasks: () => void;
  handleTaskCreate: (task: NewTaskType) => void;
  handleTaskUpdate: (task: UpdateTaskType) => void;
  handleTaskToggle: (id: string) => void;
  handleTaskDelete: (id: string) => void;
};

export type DragAndDropTasksListEvents = TasksListEvents & {
  handleTaskMove: (id: string, index: number) => void;
};

export type TasksListProps = {
  tasks: Array<TaskItemProps & { id: string; index: number }>;
} & TasksListEvents;

export type DragAndDropTasksListProps = TasksListProps &
  DragAndDropTasksListEvents;
