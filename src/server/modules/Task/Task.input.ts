import { Field, InputType, ID } from "type-graphql";

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
