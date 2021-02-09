import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { getSession } from "next-auth/client";
import { getConnection } from "server/database";
import { NodeResolver } from "server/modules/relay/NodeResolver";
import { TaskResolver } from "server/modules/Task/Task.resolver";
import { UserResolver } from "server/modules/User/User.resolver";
import {
  UserDataLoaderType,
  createUserLoader,
} from "server/modules/User/User.dataloader";

let apolloServerHandler: (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

let userLoader: UserDataLoaderType;

export const getApolloServerHandler = async () => {
  if (!userLoader) userLoader = createUserLoader();

  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [NodeResolver, TaskResolver, UserResolver],
      validate: false,
    });

    apolloServerHandler = new ApolloServer({
      schema,
      context: async ({ req }: { req: NextApiRequest }) => {
        const session = await getSession({ req });
        const connection = await getConnection();

        return {
          req,
          userId: session?.id ?? 0,
          connection,
          loaders: { user: userLoader },
        };
      },
    }).createHandler({
      path: "/api/graphql",
    });
  }
  return apolloServerHandler;
};
