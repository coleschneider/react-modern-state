import { Resolver, Args, Ctx, Query, FieldResolver, Root } from "type-graphql";
import { Context } from "server/interfaces/Context";
import { User } from "./User.entity";
import { UserConnection } from "./User.connection";
import { ConnectionArguments } from "server/modules/relay/ConnectionArguments";
import { connectionFromRepository } from "server/modules/relay/ConnectionFactory";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { userId }: Context) {
    // this is the current user and its ok to show them their own email
    if (userId === user.id) {
      return user.email;
    }
    // current user wants to see someone elses email
    return "";
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { userId }: Context) {
    // you are not logged in
    if (!userId) {
      return null;
    }

    return User.findOne(userId);
  }

  @Query(() => UserConnection)
  users(
    @Args(() => ConnectionArguments) args: ConnectionArguments,
    @Ctx() context: Context
  ) {
    return connectionFromRepository(
      args,
      context.connection.getRepository("users")
    );
  }
}
