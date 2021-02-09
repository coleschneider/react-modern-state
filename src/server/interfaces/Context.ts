import { NextApiRequest } from "next";
import { Connection } from "typeorm";
import { UserDataLoaderType } from "server/modules/User/User.dataloader";
import {
  TaskDataLoaderType,
  SubtasksDataLoaderType,
} from "server/modules/Task/Task.dataloader";

export interface Context {
  req: NextApiRequest;
  userId: number;
  connection: Connection;
  loaders: {
    user: UserDataLoaderType;
    task: TaskDataLoaderType;
    subtask: SubtasksDataLoaderType;
  };
}
