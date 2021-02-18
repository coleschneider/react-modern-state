import { Field, InputType, ObjectType, ID } from "type-graphql";
import { Task } from "./Task.entity";
import { NewTaskType, UpdateTaskType, TaskColor } from "types/task";

@InputType()
export class TaskIdInput {
  @Field(() => ID)
  id!: string;
}

@InputType()
export class MoveTaskInput {
  @Field(() => ID)
  id!: string;

  @Field(() => Number)
  index: number;
}

@InputType()
export class ToggleTaskInput {
  @Field(() => ID)
  id!: string;

  @Field(() => Boolean)
  completed!: boolean;
}

@InputType()
export class CreateTaskInput implements NewTaskType {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [String], { nullable: true })
  tags: string[] | null;

  @Field(() => TaskColor, { nullable: true })
  color: TaskColor | null;

  @Field(() => Date, { nullable: true })
  startDate: Date | null;

  @Field(() => Date, { nullable: true })
  dueDate: Date | null;

  @Field(() => Date, { nullable: true })
  remindMeAt: Date | null;

  @Field(() => ID)
  parentId: string | null;
}

@InputType()
export class UpdateTaskInput implements UpdateTaskType {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => [String], { nullable: true })
  tags?: string[] | null;

  @Field(() => TaskColor, { nullable: true })
  color?: TaskColor | null;

  @Field(() => Date, { nullable: true })
  startDate?: Date | null;

  @Field(() => Date, { nullable: true })
  dueDate?: Date | null;

  @Field(() => Date, { nullable: true })
  remindMeAt?: Date | null;

  @Field(() => Date, { nullable: true })
  completedAt?: Date | null;
}

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
  @Field(() => Task, { nullable: true })
  readonly deleted?: Task;

  @Field(() => [Task], { nullable: true })
  readonly updated?: Task[];
}

@ObjectType()
export class TaskTagsPayload {
  @Field(() => [String], { nullable: true })
  readonly tags?: string[];
}
