import * as Relay from "graphql-relay";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field(() => String, {
    nullable: true,
    description: "When paginating backwards, the cursor to continue.",
  })
  readonly startCursor?: Relay.ConnectionCursor | null;

  @Field(() => String, {
    nullable: true,
    description: "When paginating forwards, the cursor to continue.",
  })
  readonly endCursor?: Relay.ConnectionCursor | null;

  @Field(() => Boolean, {
    nullable: true,
    description: "When paginating backwards, are there more items?",
  })
  readonly hasPreviousPage?: boolean | null;

  @Field(() => Boolean, {
    nullable: true,
    description: "When paginating forwards, are there more items?",
  })
  readonly hasNextPage?: boolean | null;
}
