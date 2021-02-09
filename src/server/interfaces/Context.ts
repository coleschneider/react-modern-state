import { NextApiRequest } from "next";
import { Connection } from "typeorm";
import { UserDataLoaderType } from "server/modules/User/User.dataloader";

export interface Context {
  req: NextApiRequest;
  userId: number;
  connection: Connection;
  loaders: {
    user: UserDataLoaderType;
  };
}
