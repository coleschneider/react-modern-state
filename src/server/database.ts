import { Connection, getConnectionManager, ConnectionOptions } from "typeorm";
import { Task } from "server/modules/Task/Task.entity";
import { User } from "server/modules/User/User.entity";

export const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.NODE_ENV === "development",
  ...(process.env.DATABASE_SSL === "true" && {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
};

export const options: Record<string, ConnectionOptions> = {
  default: {
    ...connectionOptions,
    synchronize: process.env.NODE_ENV !== "production",
    entities: [User, Task],
  },
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[]
) {
  if (!entitiesChanged(connection.options.entities, entities)) return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

/**
 * @see https://github.com/typeorm/typeorm/issues/6241#issuecomment-643690383
 * @param name name of the connection
 */
export async function getConnection(
  name: string = "default"
): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    if (process.env.NODE_ENV !== "production") {
      await updateConnectionEntities(connection, options[name].entities);
    }

    return connection;
  }

  return await connectionManager.create({ name, ...options[name] }).connect();
}
