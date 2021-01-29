import "reflect-metadata";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "server/resolvers";

let apolloServerHandler: (req: any, res: any) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    });
    apolloServerHandler = new ApolloServer({ schema }).createHandler({
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
