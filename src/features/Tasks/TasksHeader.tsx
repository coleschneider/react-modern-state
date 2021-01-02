import { FC } from "react";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";

const TasksHeader = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      width="auto"
      marginX="20px"
      zIndex={3}
      borderRadius={4}
      color="white"
      bgcolor="primary.main"
      className={classes.header}
    >
      Tasks
    </Box>
  );
};

export default TasksHeader;
