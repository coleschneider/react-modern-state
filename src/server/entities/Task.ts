import { ObjectType, Field, ID } from "type-graphql";
import { TaskColor } from "types/task";

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => String, { nullable: true })
  color?: TaskColor;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field(() => Date, { nullable: true })
  remindMeAt?: Date;

  @Field(() => Date, { nullable: true })
  completedAt?: Date;

  @Field(() => Number)
  index: number;
}
