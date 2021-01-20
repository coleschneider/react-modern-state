import Paper from "@material-ui/core/Paper";
import { TaskExcerptType, TaskColor } from "types/task";
import TasksHeader from "./TasksHeader";
import TasksBody from "./TasksBody";
import useStyles from "./styles";

export default function Tasks() {
  const classes = useStyles();
  return (
    <Paper className={classes.body}>
      <TasksHeader />
      <TasksBody data={data} />
    </Paper>
  );
}

const dueDate = new Date(1999, 2, 2);
const remindMeAtDate = new Date(1999, 1, 2);
const colors: TaskColor[] = [
  null,
  "red",
  "green",
  "blue",
  "purple",
  "pink",
  "indigo",
  "cyan",
  "teal",
  "lime",
  "amber",
  "orange",
  "brown",
  "grey",
];

const data: TaskExcerptType[] = new Array(20).fill(true).map((elt, index) => ({
  id: "idx" + index,
  title: "Task " + index,
  description: index % 5 ? "Description" : null,
  tags: null,
  color: colors[index % 14],
  dueDate: index % 4 ? dueDate : null,
  remindMeAt: index % 8 ? remindMeAtDate : null,
  completedAt: null,
}));