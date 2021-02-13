import { Field, ObjectType, ID } from "type-graphql";

import { Task } from "./Task.entity";

@ObjectType()
export class MoveTaskPayload {
  @Field(() => [Task], { nullable: true })
  readonly tasks?: Task[];
}

@ObjectType()
export class TaskPayload {
  @Field(() => Task, { nullable: true })
  readonly task?: Task;
}
