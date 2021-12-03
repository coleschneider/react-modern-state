import { OwnTasksType, NewTaskType, UpdateTaskType } from "types/task";

export const createTask = (
  tasks: OwnTasksType[],
  newTask: NewTaskType
): OwnTasksType[] => {
  tasks
    .map((task) => {
      task.index++;
      return task;
    })
    .unshift({ ...newTask, id: "", index: 0 });
  return tasks;
};

export const deleteTask = (
  tasks: OwnTasksType[],
  deleted: { id: string; index: number }
): OwnTasksType[] =>
  tasks.reduce((acc, task) => {
    if (task.id === deleted.id) return acc;
    if (task.index > deleted.index) task.index--;
    acc.push(task);
    return acc;
  }, []);

export const updateTask = (
  tasks: OwnTasksType[],
  updated: UpdateTaskType
): OwnTasksType[] =>
  tasks.map((task) =>
    task.id === updated.id ? { ...task, ...updated } : task
  );

export const moveTask = (
  tasks: OwnTasksType[],
  id: string,
  index
): OwnTasksType[] => {
  const from = tasks.findIndex((task) => task.id === id);
  if (from < 0) return tasks;
  tasks.splice(index, 0, tasks.splice(from, 1)[0]);
  if (from < index) for (let i = from; i < index; i++) tasks[i].index--;
  else if (from > index) for (let i = index; i > from; i--) tasks[i].index++;
  return tasks;
};
