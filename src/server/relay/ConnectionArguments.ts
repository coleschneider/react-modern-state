import * as Relay from "graphql-relay";
import { Field, ArgsType, Int } from "type-graphql";
import { Min } from "class-validator";
import { CannotWith } from "server/validators/CannotWith";

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description:
      "Returns the elements in the list that come before the specified cursor.",
  })
  @CannotWith(["after", "first"])
  before?: Relay.ConnectionCursor | null;

  @Field(() => String, {
    nullable: true,
    description:
      "Returns the elements in the list that come after the specified cursor.",
  })
  @CannotWith(["before", "last"])
  after?: Relay.ConnectionCursor | null;

  @Field(() => Int, {
    nullable: true,
    description: "Returns the first _n_ elements from the list.",
  })
  @CannotWith(["before", "last"])
  @Min(1)
  first?: number | null;

  @Field(() => Int, {
    nullable: true,
    description: "Returns the last _n_ elements from the list.",
  })
  @CannotWith(["after", "first"])
  @Min(1)
  last?: number | null;
}
