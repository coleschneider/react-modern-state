import { useCallback } from "react";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import {
  VirtualDragAndDropListItemProps,
  useVirtualListItem,
  getDragStateZIndex,
} from "components/VirtualDragAndDropList";
import { TasksListEvents, DragAndDropTasksListEvents } from "./TasksList.types";
import TaskItem, { TaskItemProps } from "../TaskItem";

export type TaskListItemProps = Omit<
  VirtualDragAndDropListItemProps,
  "index" | "itemProps"
> &
  Omit<TaskItemProps, "onToggle" | "onDelete"> &
  Pick<TasksListEvents, "handleTaskToggle" | "handleTaskDelete"> & {
    id: string;
  };

export default function TaskListItem({
  offset,
  id,
  completed,
  title,
  description,
  tags,
  dueDate,
  subtasks,
  color,
  handleTaskToggle,
  handleTaskDelete,
}: TaskListItemProps) {
  const onToggle = useCallback(() => handleTaskToggle(id), [
    handleTaskToggle,
    id,
  ]);
  const onDelete = useCallback(() => handleTaskDelete(id), [
    handleTaskDelete,
    id,
  ]);
  return (
    <Box
      position="absolute"
      top={offset}
      left="0"
      zIndex="1"
      width="100%"
      height="110px"
    >
      <TaskItem
        completed={completed}
        title={title}
        description={description}
        tags={tags}
        dueDate={dueDate}
        subtasks={subtasks}
        color={color}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </Box>
  );
}

export type DragAndDropTaskListItemProps = VirtualDragAndDropListItemProps &
  Omit<TaskItemProps, "onToggle" | "onDelete"> &
  Pick<DragAndDropTasksListEvents, "handleTaskToggle" | "handleTaskDelete"> & {
    id: string;
  };

export function DragAndDropTaskListItem({
  index,
  offset,
  itemProps,
  id,
  completed,
  title,
  description,
  tags,
  dueDate,
  subtasks,
  color,
  handleTaskToggle,
  handleTaskDelete,
}: DragAndDropTaskListItemProps) {
  const [dragState, eventHandlers] = useVirtualListItem(index, itemProps);
  const onToggle = useCallback(() => handleTaskToggle(id), [
    handleTaskToggle,
    id,
  ]);
  const onDelete = useCallback(() => handleTaskDelete(id), [
    handleTaskDelete,
    id,
  ]);

  return (
    <Box
      position="absolute"
      top={offset}
      left="0"
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      zIndex={getDragStateZIndex(dragState)}
      width="100%"
      height="110px"
    >
      <motion.div layout initial={false} drag="y" {...eventHandlers}>
        <TaskItem
          completed={completed}
          title={title}
          description={description}
          tags={tags}
          dueDate={dueDate}
          subtasks={subtasks}
          color={color}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </motion.div>
    </Box>
  );
}
