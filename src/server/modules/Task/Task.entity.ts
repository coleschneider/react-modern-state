import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "server/modules/User/User.entity";
import { TaskColor } from "types/task";

@Entity("tasks")
@ObjectType()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("text")
  @Field(() => String)
  title!: string;

  @Column({ type: "text", nullable: true })
  @Field(() => String, { nullable: true })
  description: string;

  @Column("simple-array")
  @Field(() => [String], { nullable: true })
  tags: string[];

  @Column({ type: "text", nullable: true })
  @Field(() => String, { nullable: true })
  color?: TaskColor;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  remindMeAt?: Date;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  completedAt?: Date;

  @Column("int")
  @Field(() => Number)
  index: number;

  @Column("int")
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
