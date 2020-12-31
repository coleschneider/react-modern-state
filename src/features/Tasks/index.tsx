import TasksHeader from "./TasksHeader";
import TasksBody from "./TasksBody";
import { Card, CardHeader } from "components/Card";
import useStyles from "./styles";

export default function Tasks() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.body}>
        <CardHeader>
          <TasksHeader />
        </CardHeader>
        <TasksBody data={data} />
      </Card>
    </>
  );
}

const data = new Array(10000).fill(true).map((elt, index) => ({
  index,
  firstName: "jane" + index,
  lastName: "doe" + index,
  age: 25 + (index % 5),
}));
