import { ObjectType } from "type-graphql";

import { EdgeType } from "server/modules/relay/EdgeType";
import { Task } from "./Task.entity";

@ObjectType()
export class TaskEdge extends EdgeType("Task", Task) {}
