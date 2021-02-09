import * as Relay from "graphql-relay";
import { Field, ClassType, ObjectType } from "type-graphql";

export function EdgeType<NodeType>(
  nodeName: string,
  nodeType: ClassType<NodeType>
) {
  @ObjectType(`${nodeName}Edge`, { isAbstract: true })
  abstract class Edge implements Relay.Edge<NodeType> {
    @Field(() => nodeType, {
      description: "The item at the end of the edge.",
    })
    readonly node!: NodeType;

    @Field(() => String, { description: "A cursor for use in pagination." })
    readonly cursor!: Relay.ConnectionCursor;
  }

  return Edge;
}
