import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Task } from "./Task";

@Entity("users")
@ObjectType()
export class User {
  @PrimaryColumn("int")
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  name?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Field(() => String)
  email?: string;

  @Column({ type: "timestamptz", nullable: true })
  email_verified: Date;

  @Column({ type: "text", nullable: true })
  @Field(() => String, { nullable: true })
  image?: string;

  @Column({ type: "timestamptz" })
  created_at: Date;

  @Column({ type: "timestamptz" })
  updated_at: Date;

  @OneToMany(() => Task, (task) => task.user)
  @Field(() => [Task])
  tasks!: Task[];
}
