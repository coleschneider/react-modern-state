import Paper from "@material-ui/core/Paper";
import { ReactElement } from "react";
import { TasksHeadingProps } from "../TasksHeading";
import { TasksListProps, DragAndDropTasksListProps } from "../TasksList";
import useStyles from "./TasksContainer.style";

export type TasksContainerProps = {
  children: [
    ReactElement<TasksHeadingProps>,
    ReactElement<DragAndDropTasksListProps> | ReactElement<TasksListProps>
  ];
};

export default function TasksContainer({ children }: TasksContainerProps) {
  const classes = useStyles();
  return <Paper className={classes.container}>{children}</Paper>;
}
