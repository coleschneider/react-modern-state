import { Client } from "pg";
import { random, lorem, date } from "faker";
import { TaskColor, TaskType } from "../src/types/task";
import checkEnv from "@47ng/check-env";

checkEnv({
  required: [
    "DATABASE_USERNAME",
    "DATABASE_HOST",
    "DATABASE_NAME",
    "DATABASE_PASSWORD",
    "DATABASE_PORT",
  ],
});

const client = new Client({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number.parseInt(process.env.DATABASE_PORT, 10),
});

const maybe = <T>(value: T): T | null => (random.boolean() ? value : null);

const createTask = (
  tasksUuids: Record<string | null, string[]>,
  allTags: Set<string>
): TaskType => {
  const id = random.uuid();
  const description = maybe(lorem.paragraphs());
  const tags = maybe(
    allTags.size < 20
      ? lorem.words(random.number({ min: 1, max: 3 })).split(" ")
      : random.arrayElements([...allTags], random.number({ min: 1, max: 3 }))
  );
  const color = maybe(
    random.arrayElement([
      TaskColor.Blue,
      TaskColor.Green,
      TaskColor.Orange,
      TaskColor.Red,
    ])
  );
  const parent = random.arrayElement(Object.keys(tasksUuids));
  const parentId = maybe(parent !== "null" ? parent : null);
  const index = Object.keys(tasksUuids[parentId]).length + 1;
  const title = `#${index} ${lorem.sentence()}`;
  const userId = 0;
  const startDate = maybe(date.between(date.past(), date.future()));
  const dueDate = maybe(
    startDate
      ? date.future(undefined, startDate)
      : date.between(date.past(), date.future())
  );
  const completedAt = maybe(
    startDate
      ? date.future(undefined, startDate)
      : date.between(date.past(), date.future())
  );
  const remindMeAt = maybe(
    startDate
      ? date.future(undefined, startDate)
      : date.between(date.past(), date.future())
  );

  return {
    id,
    title,
    description,
    tags,
    color,
    startDate,
    dueDate,
    remindMeAt,
    completedAt,
    index,
    userId,
    parentId,
  };
};

(async function () {
  const taskUuids = { null: [] };
  const tasks: TaskType[] = [];
  const tags = new Set<string>();
  for (let i = random.number({ min: 200, max: 1000 }); i > 0; i--) {
    const task = createTask(taskUuids, tags);
    taskUuids[task.parentId].push(task);
    taskUuids[task.id] = [];
    if (task.tags) for (const tag of task.tags) tags.add(tag);
    tasks.push(task);
  }

  try {
    await client.connect();

    // Create demo user if not exists
    await client.query(`
      INSERT INTO users ("id", "name", "email", "email_verified", "image", "created_at", "updated_at")
      VALUES (0, 'Demo', 'demo@example.com', NOW(), 'https://material-ui.com/static/images/avatar/1.jpg', NOW(), NOW())
      ON CONFLICT DO NOTHING
    `);

    // Drop all tasks
    await client.query(`TRUNCATE TABLE tasks`);

    for (const task of tasks) {
      await client.query(
        `
        INSERT INTO tasks
          ("id","title","description","tags","color","startDate","dueDate","remindMeAt","completedAt","index","parentId","userId")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `,
        [
          task.id,
          task.title,
          task.description,
          task.tags,
          task.color,
          task.startDate,
          task.dueDate,
          task.remindMeAt,
          task.completedAt,
          task.index,
          task.parentId,
          task.userId,
        ]
      );
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
})();
