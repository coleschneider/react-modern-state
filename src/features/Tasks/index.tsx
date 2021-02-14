import Paper from "@material-ui/core/Paper";
import { TaskType, TaskColor } from "types/task";
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
  TaskColor.RED,
  TaskColor.GREEN,
  TaskColor.BLUE,
  TaskColor.PURPLE,
  TaskColor.PINK,
  TaskColor.INDIGO,
  TaskColor.CYAN,
  TaskColor.TEAL,
  TaskColor.LIME,
  TaskColor.AMBER,
  TaskColor.ORANGE,
  TaskColor.BROWN,
  TaskColor.GREY,
];

const data: TaskType[] = new Array(20).fill(true).map((elt, index) => ({
  id: "idx" + index,
  title: "Task " + index,
  description: index % 5 ? "Description" : null,
  tags: null,
  index,
  color: colors[index % 14],
  dueDate: index % 4 ? dueDate : null,
  remindMeAt: index % 8 ? remindMeAtDate : null,
  completedAt: null,
  startDate: null,
  userId: 1,
}));
