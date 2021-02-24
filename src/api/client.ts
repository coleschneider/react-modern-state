import { GraphQLClient } from "graphql-request";
import { getSdk } from "./graphql";

const graphql = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL);
const client = getSdk(graphql);

export default client;
