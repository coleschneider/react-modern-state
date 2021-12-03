import { TaskFilterType } from "types/task";
import { TaskItemProps } from "../TaskItem";

export type TasksListEvents = {
  fetchTasks: (filter?: TaskFilterType | null) => void;
  fetchMoreTasks: () => void;
  handleTaskToggle: (id: string) => void;
  handleTaskDelete: (id: string) => void;
};

export type DragAndDropTasksListEvents = TasksListEvents & {
  handleTaskMove: (id: string, index: number) => void;
};

export type TaskListItem = TaskItemProps & { id: string; index: number };

export type TasksListProps = {
  tasks: TaskListItem[];
  height?: number | string;
} & TasksListEvents;

export type DragAndDropTasksListProps = TasksListProps &
  DragAndDropTasksListEvents;
