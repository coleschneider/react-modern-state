import { ObjectType } from "type-graphql";

import { ConnectionType } from "server/modules/relay/ConnectionType";
import { UserEdge } from "./User.edge";

@ObjectType()
export class UserConnection extends ConnectionType("User", UserEdge) {}
