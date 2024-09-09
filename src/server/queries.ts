import "server-only";

import { auth } from "@clerk/nextjs/server";
import { and } from "drizzle-orm";
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
    const space = await getSpaceByName(data.space);

    if (!space) throw new Error("Space not found");

    await db.insert(tasks).values({
      userId: user.userId,
      ...data,
      isComplete: false,
      space_id: space.id,
      recurrency: data.recurrent ? "daily" : null,
    });
  } catch (error) {
    return error;
  } finally {
    redirect("/dashboard");
  }
}

export async function getSpaceByName(space: string) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  return await db.query.spaces.findFirst({
    where: (model, { eq }) =>
      and(eq(model.userId, user.userId), eq(model.name, space)),
  });
}

export async function getMySpaces() {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  return await db.query.spaces.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}
