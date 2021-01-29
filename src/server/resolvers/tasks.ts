import { Resolver, Query } from "type-graphql";
import { Task } from "../entities";
import { randomTask } from "server/utils/random";

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task], { nullable: true })
  tasks() {
    const length = Math.floor(Math.random() * 20) + 1;
    const tasks = [];
    for (let i = 1; i < length; i++) {
      tasks.push(randomTask({ index: i }));
    }
    return tasks;
  }
}
