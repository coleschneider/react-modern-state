import "reflect-metadata";
import { NextApiRequest, NextApiResponse } from "next";
import { getApolloServerHandler } from "server/graphql";

export const config = { api: { bodyParser: false } };

const bootstrap = async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};

export default bootstrap;
