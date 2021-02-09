import { Edge } from "graphql-relay";
import { Field, ClassType, ObjectType, Int } from "type-graphql";
import { PageInfo } from "./PageInfo";
import { Connection as ConnectionInterface } from "./Connection";

type ExtractNodeType<EdgeType> = EdgeType extends Edge<infer NodeType>
  ? NodeType
  : never;

export function ConnectionType<
  EdgeType extends Edge<NodeType>,
  NodeType = ExtractNodeType<EdgeType>
>(nodeName: string, edgeClass: ClassType<EdgeType>) {
  @ObjectType(`${nodeName}Connection`, { isAbstract: true })
  abstract class Connection implements ConnectionInterface<NodeType> {
    @Field(() => [edgeClass], {
      description: "A list of edges.",
      nullable: "itemsAndList",
    })
    readonly edges!: EdgeType[];

    @Field(() => PageInfo, { description: "Information to aid in pagination." })
    pageInfo!: PageInfo;

    @Field(() => Int, {
      description: "Identifies the total count of items in the connection.",
    })
    readonly totalCount!: number;
  }

  return Connection;
}
