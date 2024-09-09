import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { tasks } from "./db/schema";

export async function getMyTasks() {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  console.log("User ID:", user.userId);

  return await db.query.tasks.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

export async function createTask(data: {
  title: string;
  space: string;
  description?: string;
  priority: "low" | "medium" | "high";
  startAt: Date;
  endAt?: Date;
  recurrent?: boolean;
}) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  await db.insert(tasks).values({
    userId: user.userId,
    ...data,
    isComplete: false,
    recurrency: data.recurrent ? "daily" : null,
  });

  return data;
}
