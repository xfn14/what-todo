import "server-only";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addSpaceSchema,
  addTaskSchema,
  toggleTasksCompletionSchema,
} from "../actions/schemas";
import { db } from ".";
import { spaces, tasks } from "./schema";
import { getErrorMessage } from "~/utils/strings";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
    where: (model, { eq, and }) =>
      and(eq(model.userId, user.userId), eq(model.name, space)),
  });
}

export async function getSpaceById(space: number) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  return await db.query.spaces.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.userId, user.userId), eq(model.id, space)),
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

export async function createSpace(data: z.infer<typeof addSpaceSchema>) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  let redi = true;

  try {
    const space = await getSpaceByName(data.name);

    if (space) throw new Error("A space with this name already exists");

    if (data.parent_space !== "") {
      const parentSpace = await getSpaceByName(data.parent_space);

      if (!parentSpace) throw new Error("Parent space not found");

      await db.insert(spaces).values({
        userId: user.userId,
        ...data,
        parent_space: parentSpace.id,
      });
    } else {
      await db.insert(spaces).values({
        userId: user.userId,
        ...data,
        parent_space: -1,
      });
    }
  } catch (error) {
    redi = false;
    return getErrorMessage(error);
  } finally {
    if (redi) {
      redirect("/dashboard");
    }
  }
}

export async function deleteTask(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  await db
    .delete(tasks)
    .where(and(eq(tasks.userId, user.userId), eq(tasks.id, id)));
}

export async function deleteSpace(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  await db
    .delete(spaces)
    .where(and(eq(spaces.userId, user.userId), eq(spaces.id, id)));
}

export async function toggleTaskCompletion(
  data: z.infer<typeof toggleTasksCompletionSchema>,
) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  const task = await db.query.tasks.findFirst({
    where: (model, { eq }) => eq(model.id, data.taskId),
  });

  if (!task) throw new Error("Task not found");

  await db
    .update(tasks)
    .set({ isComplete: !task.isComplete })
    .where(and(eq(tasks.userId, user.userId), eq(tasks.id, data.taskId)));
}
