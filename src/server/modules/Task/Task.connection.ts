import { ObjectType } from "type-graphql";

import { ConnectionType } from "server/modules/relay/ConnectionType";
import { TaskEdge } from "./Task.edge";

@ObjectType()
export class TaskConnection extends ConnectionType("Task", TaskEdge) {}
