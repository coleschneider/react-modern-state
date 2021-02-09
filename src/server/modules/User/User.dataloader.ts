import DataLoader from "dataloader";
import { User } from "./User.entity";

export type UserDataLoaderType = DataLoader<number, User, number>;

export const createUserLoader = (): UserDataLoaderType =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    return userIds.map((userId) => userIdToUser[userId]);
  });
