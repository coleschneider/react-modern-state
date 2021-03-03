import { ReactElement } from "react";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
import {
  VirtualDragAndDropListItemProps,
  useVirtualListItem,
  getDragStateZIndex,
} from "components/VirtualDragAndDropList";
import { TaskItemProps } from "../TaskItem";

export type TaskListItemProps = Omit<
  VirtualDragAndDropListItemProps,
  "index" | "itemProps"
> & {
  children: ReactElement<TaskItemProps>;
};

export default function TaskListItem({
  offset,
  children,
}: Omit<TaskListItemProps, "index" | "itemProps">) {
  return (
    <Box
      position="absolute"
      top={offset}
      left="0"
      zIndex="1"
      width="100%"
      height="150px"
    >
      {children}
    </Box>
  );
}

export type DragAndDropTaskListItemProps = VirtualDragAndDropListItemProps & {
  children: ReactElement<TaskItemProps>;
};

export function DragAndDropTaskListItem({
  index,
  offset,
  itemProps,
  children,
}: DragAndDropTaskListItemProps) {
  const [dragState, eventHandlers] = useVirtualListItem(index, itemProps);

  return (
    <Box
      position="absolute"
      top={offset}
      left="0"
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      zIndex={getDragStateZIndex(dragState)}
      width="100%"
      height="150px"
    >
      <motion.div layout initial={false} drag="y" {...eventHandlers}>
        {children}
      </motion.div>
    </Box>
  );
}
