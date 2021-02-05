import "reflect-metadata";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { getSession } from "next-auth/client";
import { getConnection } from "server/database";
import { TaskResolver } from "server/resolvers";

let apolloServerHandler: (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    });

    apolloServerHandler = new ApolloServer({
      schema,
      context: async ({ req }) => {
        const session = await getSession({ req });
        const connection = await getConnection();

        return { userId: session?.id ?? 0, connection };
      },
    }).createHandler({
      path: "/api/graphql",
    });
  }
  return apolloServerHandler;
};

export const config = { api: { bodyParser: false } };

const bootstrap = async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};

export default bootstrap;
