import { Field, InputType, ID } from "type-graphql";
import { TaskType, TaskColor } from "types/task";

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
export class CreateTaskInput implements Partial<TaskType> {
  @Field(() => String)
  title!: string;

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

  @Field(() => ID)
  parentId?: string | null;
}

@InputType()
export class UpdateTaskInput implements Partial<TaskType> {
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
