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
import {
  TaskIdInput,
  MoveTaskInput,
  ToggleTaskInput,
  CreateTaskInput,
  UpdateTaskInput,
  TasksPayload,
  TaskPayload,
  DeleteTaskPayload,
  TaskTagsPayload,
} from "./Task.models";
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
      where: { userId, parentId: null },
      order: { index: "ASC" },
    });
  }

  @Query(() => Task)
  async task(
    @Arg("id", () => String) id: string,
    @Ctx() { userId, connection }: Context
  ) {
    const repository = connection.getRepository<Task>("tasks");
    return await repository.findOne({ where: { id, userId } });
  }

  @Query(() => TaskTagsPayload)
  async taskTags(
    @Ctx() { userId, connection }: Context
  ): Promise<TaskTagsPayload> {
    const repository = connection.getRepository<Task>("tasks");

    const result: Pick<Task, "tags">[] = await repository
      .createQueryBuilder("users")
      .select("tags")
      .distinct()
      .where({ userId })
      .execute();

    const allTags = new Set<string>();
    for (const { tags } of result)
      if (tags) for (const tag of tags) allTags.add(tag);
    return { tags: [...allTags] };
  }

  // Anonymous users are allowed to move tasks for demo purposes
  @Mutation(() => TasksPayload)
  async moveTask(
    @Arg("input", () => MoveTaskInput) { id, index }: MoveTaskInput,
    @Ctx() { connection, userId }: Context
  ): Promise<TasksPayload> {
    if (index < 1) throw new UserInputError(`invalid index ${index}`);

    const repository = connection.getRepository<Task>("tasks");

    const task = await repository.findOne({ where: { id, userId } });

    if (!task)
      throw new UserInputError(`Cannot find task with id \`${task.id}\``);

    // Task is moved to same position
    if (task.index === index) return { tasks: [task] };

    // Index is greater than available tasks
    const totalCount = await repository.count({ where: { id, userId } });
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
        userId,
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
      .where({ id, userId })
      .returning("*")
      .execute();

    if (!result.affected)
      throw new UserInputError(`Cannot find task with id \`${id}\``);

    return { task: result.raw[0] as Task };
  }

  @Mutation(() => TaskPayload)
  async createTask(
    @Arg("input", () => CreateTaskInput) task: CreateTaskInput,
    @Ctx() { connection, userId }: Context
  ): Promise<TaskPayload> {
    if (!userId) throw new AuthenticationError("Not logged in");

    const repository = connection.getRepository<Task>("tasks");

    // Check if user is trying to insert a task under non-existing or foreign task
    if (
      task.parentId !== null &&
      !(await repository.findOne({ where: { id: task.parentId, userId } }))
    )
      throw new UserInputError(
        `Parent task \`${task.parentId}\` was not created by user`
      );

    // Move all sibling tasks one position up to insert the new task as first
    let result = await repository
      .createQueryBuilder()
      .update(Task)
      .set({ index: () => "index + 1" })
      .where({ userId, parentId: task.parentId })
      .execute();

    result = await repository
      .createQueryBuilder()
      .insert()
      .into(Task)
      .values([{ ...task, index: 1, userId }])
      .returning("*")
      .execute();

    return { task: result.raw[0] as Task };
  }

  @Mutation(() => TaskPayload)
  async updateTask(
    @Arg("input", () => UpdateTaskInput) { id, ...task }: UpdateTaskInput,
    @Ctx() { connection, userId }: Context
  ): Promise<TaskPayload> {
    if (!userId) throw new AuthenticationError("Not logged in");

    const repository = connection.getRepository<Task>("tasks");

    let result = await repository
      .createQueryBuilder()
      .update(Task)
      .set(task)
      .where({ id, userId })
      .returning("*")
      .execute();

    if (!result.affected)
      throw new UserInputError(`Cannot find task with id \`${id}\``);

    return { task: result.raw[0] as Task };
  }

  @Mutation(() => DeleteTaskPayload)
  async deleteTask(
    @Arg("input", () => TaskIdInput) { id }: TaskIdInput,
    @Ctx() { connection, userId }: Context
  ): Promise<DeleteTaskPayload> {
    if (!userId) throw new AuthenticationError("Not logged in");

    const repository = connection.getRepository<Task>("tasks");

    let result = await repository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where({ id, userId })
      .returning("*")
      .execute();

    if (!result.affected)
      throw new UserInputError(`Cannot find task with id \`${id}\``);

    const deleted = result.raw[0] as Task;

    // Reduce all following tasks' indexes
    result = await repository
      .createQueryBuilder()
      .update(Task)
      .set({ index: () => "index - 1" })
      .where({
        id,
        userId,
        parentId: deleted.parentId,
        index: MoreThan(deleted.index),
      })
      .returning("*")
      .execute();

    return { deleted, updated: result.raw as Task[] };
  }
}
