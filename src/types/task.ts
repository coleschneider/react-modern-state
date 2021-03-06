export type TaskType = {
  id: string;
  title: string;
  description?: string | null;
  tags?: string[] | null;
  color?: TaskColor | null;
  startDate?: Date | null;
  dueDate?: Date | null;
  remindMeAt?: Date | null;
  completedAt?: Date | null;
  index: number;
  userId: number;
  parentId?: string | null;
};

export enum TaskColor {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",
  Orange = "Orange",
}

export type OwnTasksType = Omit<TaskType, "userId">;

export type TaskPositionType = Pick<TaskType, "id" | "index">;

export type NewTaskType = Omit<
  TaskType,
  "id" | "index" | "completedAt" | "userId"
>;

export type UpdateTaskType = Pick<TaskType, "id"> &
  Partial<Omit<TaskType, "id" | "index" | "userId">>;

export type TaskFilterType = {
  text?: string;
  completed?: boolean;
  tags?: string[];
  startDate?: [Date | null, Date | null];
  dueDate?: [Date | null, Date | null];
};
