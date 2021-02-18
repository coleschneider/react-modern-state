export type TaskType = {
  id: string;
  title: string;
  description: string | null;
  tags: string[] | null;
  color: TaskColor | null;
  startDate: Date | null;
  dueDate: Date | null;
  remindMeAt: Date | null;
  completedAt: Date | null;
  index: number;
  userId: number;
};

export enum TaskColor {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  PURPLE = "purple",
  PINK = "pink",
  INDIGO = "indigo",
  CYAN = "cyan",
  TEAL = "teal",
  LIME = "lime",
  AMBER = "amber",
  ORANGE = "orange",
  BROWN = "brown",
  GREY = "grey",
}

export type TaskPositionType = Pick<TaskType, "id" | "index">;

export type NewTaskType = Omit<
  TaskType,
  "id" | "index" | "completedAt" | "userId"
>;

export type UpdateTaskType = Pick<TaskType, "id"> &
  Partial<Omit<TaskType, "id" | "index" | "userId">>;
