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
