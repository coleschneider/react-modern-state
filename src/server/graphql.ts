import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { getSession } from "next-auth/client";
import { Context } from "server/interfaces/Context";
import { getConnection } from "server/database";
import { NodeResolver } from "server/modules/relay/NodeResolver";
import { TaskResolver } from "server/modules/Task/Task.resolver";
import { UserResolver } from "server/modules/User/User.resolver";
import {
  UserDataLoaderType,
  createUserLoader,
} from "server/modules/User/User.dataloader";
import {
  TaskDataLoaderType,
  createTaskLoader,
  SubtasksDataLoaderType,
  createSubtasksLoader,
} from "server/modules/Task/Task.dataloader";

let apolloServerHandler: (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

let userLoader: UserDataLoaderType;
let taskLoader: TaskDataLoaderType;
let subtaskLoader: SubtasksDataLoaderType;

export const getApolloServerHandler = async () => {
  if (!userLoader) userLoader = createUserLoader();
  if (!taskLoader) taskLoader = createTaskLoader();
  if (!subtaskLoader) subtaskLoader = createSubtasksLoader();

  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [NodeResolver, TaskResolver, UserResolver],
      emitSchemaFile: process.env.NODE_ENV === "development",
      validate: false,
    });

    apolloServerHandler = new ApolloServer({
      schema,
      context: async ({ req }: { req: NextApiRequest }): Promise<Context> => {
        const session = await getSession({ req });
        const connection = await getConnection();

        return {
          req,
          userId: session?.id ?? 0,
          connection,
          loaders: {
            user: userLoader,
            task: taskLoader,
            subtask: subtaskLoader,
          },
        };
      },
    }).createHandler({
      path: "/api/graphql",
    });
  }
  return apolloServerHandler;
};
