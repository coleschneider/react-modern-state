import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TodayIcon from "@material-ui/icons/Today";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import clsx from "clsx";
import { TaskColor } from "types/task";
import useStyles from "./TaskItem.style";

export type TaskItemProps = {
  completed?: boolean;
  title: string;
  description?: string | null;
  tags?: string[] | null;
  dueDate?: Date | null;
  subtasks?: [number, number] | null;
  color?: TaskColor | null;
  onToggle: CheckboxProps["onChange"];
  onDelete: IconButtonProps["onClick"];
};

export default function TaskItem({
  completed,
  title,
  description,
  tags,
  dueDate,
  subtasks,
  color,
  onToggle,
  onDelete,
}: TaskItemProps) {
  const classes = useStyles();
  const itemStyle = clsx(classes.container, classes[color || "default"]);

  return (
    <Card variant="outlined" className={itemStyle}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        height="18px"
        paddingTop="4px"
        data-testid="header"
      >
        <Box data-testid="tags">
          {tags &&
            tags.map((tag) => (
              <Chip
                key={tag}
                size="small"
                label={tag}
                className={classes.tag}
              />
            ))}
        </Box>
      </Box>
      <CardContent className={classes.content} data-testid="content">
        <Box display="flex" justifyContent="center" alignContent="center">
          <Checkbox
            color="primary"
            checked={completed}
            tabIndex={-1}
            onChange={onToggle}
            data-testid="completed"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flexGrow="1"
        >
          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle1" noWrap data-testid="title">
              {title}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="textSecondary"
            noWrap
            data-testid="description"
          >
            {description}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignContent="center">
          <Tooltip title="Remove" placement="top">
            <IconButton
              onClick={onDelete}
              aria-label="Close"
              data-testid="delete"
            >
              <DeleteIcon htmlColor="#7D1A0C" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0"
        height="18px"
        mx={2}
        mt="-5px"
        data-testid="footer"
      >
        <RemainingDays dueDate={dueDate} />
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          data-testid="subtasks"
        >
          {subtasks && (
            <>
              <Box mr={1} width="120px" alignItems="center">
                <LinearProgress
                  variant="determinate"
                  value={(subtasks[0] / subtasks[1]) * 100}
                />
              </Box>
              <Typography variant="caption">
                {`${subtasks[0]} / ${subtasks[1]}`}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
}

const RemainingDays = ({ dueDate }: { dueDate: Date | undefined | null }) => {
  const remainingDays = dueDate
    ? Math.floor(
        Math.abs(new Date().getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
      )
    : null;

  let label;
  if (remainingDays === null) label = "";
  else if (remainingDays === 0) label = "Today";
  else if (remainingDays < 0) label = `${remainingDays} days overdue`;
  else label = `${remainingDays} days remaining`;

  return (
    <Box display="flex" flexDirection="row" mt="-4px" ml="2px">
      {label && <TodayIcon fontSize="small" />}
      <FormHelperText data-testid="dueDate">{label}</FormHelperText>
    </Box>
  );
};
