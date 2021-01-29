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

export type TaskColor =
  | "red"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "indigo"
  | "cyan"
  | "teal"
  | "lime"
  | "amber"
  | "orange"
  | "brown"
  | "grey";
