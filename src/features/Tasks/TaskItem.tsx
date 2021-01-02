import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { VirtualItem } from "react-virtual";
import clsx from "clsx";
import { TaskExcerptType } from "types/task";
import useStyles from "./styles";

type TaskItemProps = {
  task: TaskExcerptType;
  virtualRow: VirtualItem;
};

export default function TaskItem({ task, virtualRow }: TaskItemProps) {
  const classes = useStyles();
  const rowStyle = clsx(
    classes.tableRow,
    task.color ? classes[task.color] : null
  );

  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      height={`${virtualRow.size}px`}
      boxSizing="border-box"
      position="absolute"
      top="0"
      left="0"
      className={rowStyle}
      style={{ transform: `translateY(${virtualRow.start}px)` }}
    >
      <Box display="flex" justifyContent="center" alignContent="center">
        <Checkbox
          color="primary"
          defaultChecked={!!task.completedAt}
          tabIndex={-1}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flexGrow="1"
      >
        <Box display="flex" flexDirection="row">
          <Typography variant="subtitle2">{task.title}</Typography>
        </Box>
        <Typography variant="caption">{task.description}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignContent="center">
        <Tooltip title="Remove" placement="top">
          <IconButton aria-label="Close">
            <DeleteIcon color="action" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
