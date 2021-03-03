import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import clsx from "clsx";
import { TaskColor } from "types/task";
import useStyles from "./TaskItem.style";

export type TaskItemProps = {
  completed: boolean;
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
  const itemStyle = clsx(classes.container, color ? classes[color] : null);

  return (
    <Card variant="outlined" className={itemStyle}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        minHeight="18px"
        paddingTop="4px"
      >
        {tags &&
          tags.map((tag) => (
            <Chip key={tag} size="small" label={tag} className={classes.tag} />
          ))}
      </Box>
      <CardContent className={classes.content}>
        <Box display="flex" justifyContent="center" alignContent="center">
          <Checkbox
            color="primary"
            defaultChecked={completed}
            tabIndex={-1}
            onChange={onToggle}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flexGrow="1"
        >
          <Box display="flex" flexDirection="row">
            <Typography variant="subtitle1" noWrap>
              {title}
            </Typography>
          </Box>
          <Typography variant="caption" color="textSecondary" noWrap>
            {description}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignContent="center">
          <Tooltip title="Remove" placement="top">
            <IconButton onClick={onDelete} aria-label="Close">
              <DeleteIcon htmlColor="#9F0A28" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0"
        minHeight="18px"
        ml={2}
        mt="-5px"
      >
        <Box height="18px">
          {dueDate && <RemainingDays dueDate={dueDate} />}&nbsp;
        </Box>
        <Box height="18px">
          {subtasks && (
            <Box display="flex" flexDirection="row" alignItems="center" mr={2}>
              <Box mr={1} width="120px" alignItems="center">
                <LinearProgress
                  variant="determinate"
                  value={(subtasks[0] / subtasks[1]) * 100}
                />
              </Box>
              <Typography variant="caption">
                {`${subtasks[0]} / ${subtasks[1]}`}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}

const RemainingDays = ({ dueDate }: { dueDate: Date }) => {
  const remainingDays = Math.ceil(
    Math.abs(new Date().getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
  );

  let label;
  if (remainingDays === 0) label = "today";
  if (remainingDays < 0) label = `${remainingDays} days overdue`;
  else label = `${remainingDays} days remaining`;

  return <Typography variant="caption">{label}</Typography>;
};
