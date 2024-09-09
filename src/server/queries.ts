import "server-only";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { addTaskSchema } from "./actions/schemas";
import { db } from "./db";
import { tasks } from "./db/schema";

export async function getMyTasks() {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  return await db.query.tasks.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

export async function createTask(data: z.infer<typeof addTaskSchema>) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  try {
    await db.insert(tasks).values({
      userId: user.userId,
      ...data,
      isComplete: false,
      recurrency: data.recurrent ? "daily" : null,
    });
  } catch (error) {
    return error;
  } finally {
    redirect("/dashboard");
  }
}
