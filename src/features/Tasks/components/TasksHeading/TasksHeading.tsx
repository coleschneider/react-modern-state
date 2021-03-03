import Box from "@material-ui/core/Box";
import useStyles from "./TasksHeading.style";

export type TasksHeadingProps = {};

export default function TasksHeading(props: TasksHeadingProps) {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      width="auto"
      marginX="20px"
      padding="15px"
      zIndex={3}
      borderRadius={4}
      color="white"
      bgcolor="primary.main"
      className={classes.header}
    >
      Tasks
    </Box>
  );
}
