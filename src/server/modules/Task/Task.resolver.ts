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
