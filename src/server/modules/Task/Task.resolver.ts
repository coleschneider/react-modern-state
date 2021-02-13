import {
  Resolver,
  FieldResolver,
  Query,
  Mutation,
  Root,
  Arg,
  Args,
  Ctx,
} from "type-graphql";
import { Between, MoreThan } from "typeorm";
import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { Context } from "server/interfaces/Context";
import { User } from "server/modules/User/User.entity";
import { Task } from "./Task.entity";
import { TaskConnection } from "./Task.connection";
import { TaskIdInput, MoveTaskInput, ToggleTaskInput } from "./Task.input";
import { TasksPayload, TaskPayload, DeleteTaskPayload } from "./Task.payload";
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

  @FieldResolver(() => [Task], { nullable: true })
  subtasks(
    @Root() task: Task | null,
    @Ctx() { loaders: { subtask } }: Context
  ) {
    return subtask.load(task.id);
  }

  @Query(() => TaskConnection)
  tasks(
    @Args(() => ConnectionArguments) args: ConnectionArguments,
    @Ctx() { userId, connection }: Context
  ) {
    return connectionFromRepository(args, connection.getRepository("tasks"), {
      where: { userId: userId || 1, parentId: null },
      order: { index: "ASC" },
    });
  }

  @Query(() => Task)
  async task(
    @Arg("id", () => String) id: string,
    @Ctx() { userId, connection }: Context
  ) {
    const repository = connection.getRepository<Task>("tasks");
    return await repository.findOne({
      where: { id: id, userId: userId || 1 },
    });
  }

  // Anonymous users are allowed to move tasks for demo purposes
  @Mutation(() => TasksPayload)
  async moveTask(
    @Arg("input", () => MoveTaskInput) { id, index }: MoveTaskInput,
    @Ctx() { connection, userId }: Context
  ): Promise<TasksPayload> {
    if (index < 1) throw new UserInputError(`invalid index ${index}`);

    const repository = connection.getRepository<Task>("tasks");

    const task = await repository.findOne({
      where: { id: id, userId: userId || 1 },
    });

    // Task is moved to same position
    if (task.index === index) return { tasks: [task] };

    // Index is greater than available tasks
    const totalCount = await repository.count({
      where: { id: id, userId: userId || 1 },
    });
    if (index > totalCount) index = totalCount;

    const result = await repository
      .createQueryBuilder()
      .update(Task)
      .set({
        index: () =>
          `CASE WHEN id = '${id}' THEN ${index} ELSE index ${
            task.index > index ? "+" : "-"
          } 1 END`,
      })
      .where({
        // Only tasks by the same user, at the same level, between the range of changed indexes
        userId: userId || 1,
        parentId: task.parentId,
        index: Between(
          Math.min(task.index, index),
          Math.max(task.index, index)
        ),
      })
      .returning("*")
      .execute();

    return { tasks: result.raw as Task[] };
  }

  // Anonymous users are allowed to toggle tasks for demo purposes
  @Mutation(() => TaskPayload)
  async toggleTask(
    @Arg("input", () => ToggleTaskInput) { id, completed }: ToggleTaskInput,
    @Ctx() { connection, userId }: Context
  ): Promise<TaskPayload> {
    const repository = connection.getRepository<Task>("tasks");

    const result = await repository
      .createQueryBuilder()
      .update(Task)
      .set({ completedAt: completed ? new Date() : null })
      .where({
        id,
        userId: userId || 1,
      })
      .returning("*")
      .execute();

    if (!result.affected)
      throw new UserInputError(`Cannot find task with id \`${id}\``);

    return { task: result.raw[0] as Task };
  }

  @Mutation(() => DeleteTaskPayload)
  async removeTask(
    @Arg("input", () => TaskIdInput) { id }: TaskIdInput,
    @Ctx() { connection, userId }: Context
  ): Promise<DeleteTaskPayload> {
    if (!userId) throw new AuthenticationError("Not logged in");

    const repository = connection.getRepository<Task>("tasks");

    let result = await repository
      .createQueryBuilder()
      .delete()
      .from(Task)
      // Delete task and subtasks
      .where([{ id, userId }, { parentId: id }])
      .returning("*")
      .execute();

    if (!result.affected)
      throw new UserInputError(`Cannot find task with id \`${id}\``);

    const deleted = result.raw as Task[];
    const deletedTask = deleted.find((t) => t.id === id);

    // Reduce all following tasks' indexes
    result = await repository
      .createQueryBuilder()
      .update(Task)
      .set({ index: () => "index - 1" })
      .where({
        id,
        userId,
        parentId: deletedTask.parentId,
        index: MoreThan(deletedTask.index),
      })
      .returning("*")
      .execute();

    return { deleted, updated: result.raw as Task[] };
  }
}
