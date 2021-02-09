import { Resolver, FieldResolver, Query, Root, Args, Ctx } from "type-graphql";
import { Context } from "server/interfaces/Context";
import { User } from "server/modules/User/User.entity";
import { Task } from "./Task.entity";
import { TaskConnection } from "./Task.connection";
import { ConnectionArguments } from "server/modules/relay/ConnectionArguments";
import { connectionFromRepository } from "server/modules/relay/ConnectionFactory";

@Resolver(Task)
export class TaskResolver {
  @FieldResolver(() => User)
  user(@Root() task: Task, @Ctx() { loaders: { user } }: Context) {
    return user.load(task.userId);
  }

  @FieldResolver(() => Task)
  parent(
    @Root() task: Task | null,
    @Ctx() { loaders: { task: taskLoader } }: Context
  ) {
    if (!task.parentId) return null;
    return taskLoader.load(task.parentId);
  }

  @FieldResolver(() => [Task])
  subtasks(
    @Root() task: Task | null,
    @Ctx() { loaders: { subtask } }: Context
  ) {
    if (!task.parentId) return null;
    return subtask.load(task.id);
  }

  @Query(() => TaskConnection)
  tasks(
    @Args(() => ConnectionArguments) args: ConnectionArguments,
    @Ctx() context: Context
  ) {
    return connectionFromRepository(
      args,
      context.connection.getRepository("tasks")
    );
  }
}
