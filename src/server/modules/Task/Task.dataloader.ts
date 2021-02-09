import { In } from "typeorm";
import DataLoader from "dataloader";
import { Task } from "./Task.entity";

export type TaskDataLoaderType = DataLoader<string, Task, string>;

export const createTaskLoader = (): TaskDataLoaderType =>
  new DataLoader<string, Task>(async (taskIds) => {
    const tasks = await Task.findByIds(taskIds as string[]);
    const taskIdToTask: Record<string, Task> = {};
    tasks.forEach((t) => {
      taskIdToTask[t.id] = t;
    });

    return taskIds.map((taskId) => taskIdToTask[taskId]);
  });

export type SubtasksDataLoaderType = DataLoader<string, Task[], string>;

export const createSubtasksLoader = (): SubtasksDataLoaderType =>
  new DataLoader<string, Task[]>(async (taskIds) => {
    const tasks = await Task.find({
      where: { parentId: In(taskIds as string[]) },
    });
    const taskIdToSubtasks: Record<string, Task[]> = {};
    tasks.forEach((t) => {
      let parent = taskIdToSubtasks[t.parentId];
      if (!parent) parent = [];
      parent.push(t);
    });

    return taskIds.map((taskId) => taskIdToSubtasks[taskId]);
  });
