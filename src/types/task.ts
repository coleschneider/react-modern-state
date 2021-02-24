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
};

export enum TaskColor {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",
  Purple = "Purple",
  Pink = "Pink",
  Indigo = "Indigo",
  Cyan = "Cyan",
  Teal = "Teal",
  Lime = "Lime",
  Amber = "Amber",
  Orange = "Orange",
  Brown = "Brown",
  Grey = "Grey",
}

export type OwnTasksType = Omit<TaskType, "userId">;

export type TaskPositionType = Pick<TaskType, "id" | "index">;

export type NewTaskType = Omit<
  TaskType,
  "id" | "index" | "completedAt" | "userId"
>;

export type UpdateTaskType = Pick<TaskType, "id"> &
  Partial<Omit<TaskType, "id" | "index" | "userId">>;
