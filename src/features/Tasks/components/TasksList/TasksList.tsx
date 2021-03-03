import { useCallback } from "react";
import { VirtualDragAndDropList } from "components/VirtualDragAndDropList";
import { VirtualList } from "components/VirtualList";
import {
  TaskType,
  NewTaskType,
  UpdateTaskType,
  TaskFilterType,
} from "types/task";
import TaskListItem, { DragAndDropTaskListItem } from "./TaskListItem";
import TaskItem from "../TaskItem/TaskItem";
import useStyles from "./TasksList.style";

export type TasksListProps = {
  tasks: TaskType[];
  fetchTasks: (filter?: TaskFilterType | null) => void;
  fetchMoreTasks: () => void;
  handleTaskCreate: (task: NewTaskType) => void;
  handleTaskUpdate: (task: UpdateTaskType) => void;
  handleTaskDelete: (id: string) => void;
};

export default function TasksList({ tasks }: TasksListProps) {
  const classes = useStyles();

  return (
    <VirtualList
      items={tasks}
      itemSize={150}
      height="90vh"
      width="100%"
      innerProps={{ className: classes.listContainer }}
    >
      {(task, offset) => (
        <TaskListItem key={task.id} offset={offset}>
          <TaskItem
            completed={!!task.completedAt}
            title={task.title}
            description={task.description}
            tags={task.tags}
            dueDate={task.dueDate}
            subtasks={null}
            color={task.color}
            onToggle={() => null}
            onDelete={() => null}
          />
        </TaskListItem>
      )}
    </VirtualList>
  );
}

export type DragAndDropTasksListProps = TasksListProps & {
  handleTaskMove: (id: string, index: number) => void;
};

export function DragAndDropTasksList({
  tasks,
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
      swapDistance={80}
      itemSize={150}
      onPositionUpdate={onPositionUpdate}
      height="90vh"
      width="100%"
      innerProps={{ className: classes.listContainer }}
    >
      {(task, index, offset, itemProps) => (
        <DragAndDropTaskListItem
          key={task.id}
          index={index}
          offset={offset}
          itemProps={itemProps}
        >
          <TaskItem
            completed={!!task.completedAt}
            title={task.title}
            description={task.description}
            tags={task.tags}
            dueDate={task.dueDate}
            subtasks={null}
            color={task.color}
            onToggle={() => null}
            onDelete={() => null}
          />
        </DragAndDropTaskListItem>
      )}
    </VirtualDragAndDropList>
  );
}
