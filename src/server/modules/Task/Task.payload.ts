import { Field, ObjectType } from "type-graphql";

import { Task } from "./Task.entity";

@ObjectType()
export class TasksPayload {
  @Field(() => [Task], { nullable: true })
  readonly tasks?: Task[];
}

@ObjectType()
export class TaskPayload {
  @Field(() => Task, { nullable: true })
  readonly task?: Task;
}

@ObjectType()
export class DeleteTaskPayload {
  @Field(() => [Task], { nullable: true })
  readonly deleted?: Task[];

  @Field(() => [Task], { nullable: true })
  readonly updated?: Task[];
}
