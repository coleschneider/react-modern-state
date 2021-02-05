import faker from "faker";
import { IUser } from "types/auth";
import { TaskType, TaskColor } from "types/task";

export function randomTask({
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
}: Partial<TaskType> = {}): TaskType {
  const dateStart = faker.date.between(faker.date.recent(), faker.date.soon());
  const dateEnd = maybe(faker.date.future(null, dateStart));
  const dateRemind = maybe(
    dateEnd
      ? faker.date.between(dateStart, dateEnd)
      : faker.date.future(null, dateStart)
  );
  const dateCompleted = maybe(
    dateEnd
      ? faker.date.between(dateStart, dateEnd)
      : faker.date.future(null, dateStart)
  );

  return {
    id: id || faker.random.uuid(),
    title: title || faker.lorem.sentence(),
    description: description || maybe(faker.lorem.paragraph()),
    tags: tags || faker.random.words().split(" "),
    color: color || maybe(faker.random.arrayElement(taskColor)),
    startDate: startDate || dateStart,
    dueDate: dueDate || dateEnd,
    remindMeAt: remindMeAt || dateRemind,
    completedAt: completedAt || dateCompleted,
    index: index || faker.random.number(),
    userId: userId || faker.random.number({ min: 1 }),
  };
}

export function randomUser({
  id,
  name,
  image,
  email,
}: Partial<IUser> = {}): IUser {
  return {
    id: id || faker.random.number({ min: 1 }),
    name: name || faker.internet.userName(),
    image: image || faker.random.image(),
    email: email || faker.internet.email(),
  };
}

function maybe<T>(value: T): T | null {
  return faker.random.boolean() ? value : null;
}

const taskColor: TaskColor[] = [
  "red",
  "green",
  "blue",
  "purple",
  "pink",
  "indigo",
  "cyan",
  "teal",
  "lime",
  "amber",
  "orange",
  "brown",
  "grey",
];
