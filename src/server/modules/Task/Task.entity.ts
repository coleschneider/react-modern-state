import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { User } from "server/modules/User/User.entity";
import { TaskType, TaskColor } from "types/task";

registerEnumType(TaskColor, {
  name: "TaskColor",
});

@Entity("tasks")
@ObjectType()
export class Task extends BaseEntity implements TaskType {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("text")
  @Field(() => String)
  title!: string;

  @Column({ type: "text", nullable: true })
  @Field(() => String, { nullable: true })
  description: string | null;

  @Column({ type: "varchar", length: 50, array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  tags: string[] | null;

  @Column({ type: "enum", enum: TaskColor, nullable: true })
  @Field(() => TaskColor, { nullable: true })
  color: TaskColor | null;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  startDate: Date | null;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  dueDate: Date | null;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  remindMeAt: Date | null;

  @Column({ type: "date", nullable: true })
  @Field(() => Date, { nullable: true })
  completedAt: Date | null;

  @Column("int")
  @Field(() => Number)
  index: number;

  @Column({ type: "uuid", nullable: true })
  parentId?: string | null;

  @ManyToOne(() => Task, (task) => task.subtasks, { nullable: true })
  parent: Task;

  @OneToMany(() => Task, (task) => task.parent, { onDelete: "CASCADE" })
  subtasks: Task[];

  @Column("int")
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
