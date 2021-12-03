import { useCallback } from "react";
import { VirtualDragAndDropList } from "components/VirtualDragAndDropList";
import { VirtualList } from "components/VirtualList";
import TaskListItem, { DragAndDropTaskListItem } from "./TaskListItem";
import { TasksListProps, DragAndDropTasksListProps } from "./TasksList.types";
import useStyles from "./TasksList.style";

export default function TasksList({
  tasks,
  height = "90vh",
  handleTaskToggle,
  handleTaskDelete,
}: TasksListProps) {
  const classes = useStyles();

  return (
    <VirtualList
      items={tasks}
      itemSize={110}
      height={height}
      width="100%"
      className={classes.listContainer}
    >
      {(task, offset) => (
        <TaskListItem
          key={task.id}
          offset={offset}
          id={task.id}
          completed={task.completed}
          title={task.title}
          description={task.description}
          tags={task.tags}
          dueDate={task.dueDate}
          subtasks={task.subtasks}
          color={task.color}
          handleTaskToggle={handleTaskToggle}
          handleTaskDelete={handleTaskDelete}
        />
      )}
    </VirtualList>
  );
}

export function DragAndDropTasksList({
  tasks,
  handleTaskToggle,
  handleTaskDelete,
  handleTaskMove,
}: DragAndDropTasksListProps) {
  const classes = useStyles();

  const onPositionUpdate = useCallback(
    (startIndex: number, endIndex: number) => {
      const task = tasks.find((task) => task.index === startIndex);
      if (task) handleTaskMove(task.id, endIndex);
    },
    [tasks, handleTaskMove]
  );

  return (
    <VirtualDragAndDropList
      items={tasks}
      swapDistance={60}
      itemSize={110}
      onPositionUpdate={onPositionUpdate}
      height="90vh"
      width="100%"
      className={classes.listContainer}
    >
      {(task, index, offset, itemProps) => (
        <DragAndDropTaskListItem
          key={task.id}
          index={index}
          offset={offset}
          itemProps={itemProps}
          id={task.id}
          completed={task.completed}
          title={task.title}
          description={task.description}
          tags={task.tags}
          dueDate={task.dueDate}
          subtasks={task.subtasks}
          color={task.color}
          handleTaskToggle={handleTaskToggle}
          handleTaskDelete={handleTaskDelete}
        />
      )}
    </VirtualDragAndDropList>
  );
}
