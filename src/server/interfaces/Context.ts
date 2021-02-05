import { Connection, Repository } from "typeorm";

import { Node } from "../relay/Node";

export interface Context {
  database: Connection;
  repositories: Record<string, Repository<Node>>;
}
