import { ObjectType } from "type-graphql";

import { EdgeType } from "server/modules/relay/EdgeType";
import { User } from "./User.entity";

@ObjectType()
export class UserEdge extends EdgeType("User", User) {}
