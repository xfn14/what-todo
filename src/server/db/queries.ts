"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  addSpaceSchema,
  addTaskSchema,
  deleteTaskSchema,
  toggleTasksCompletionSchema,
  updateTaskSchema,
} from "../actions/schemas";
import { db } from ".";
import { spaces, tasks } from "./schema";
import { and, eq } from "drizzle-orm";

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

  const space = await getSpaceByName(data.space);

  if (!space) throw new Error("Space not found");

  return await db
    .insert(tasks)
    .values({
      userId: user.userId,
      ...data,
      isComplete: false,
      space_id: space.id,
      recurrency: data.recurrent ? "daily" : null,
    })
    .returning();
}

export async function updateTask(data: z.infer<typeof updateTaskSchema>) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  const space = await getSpaceByName(data.space);

  if (!space) throw new Error("Space not found");

  return await db
    .update(tasks)
    .set({
      title: data.title,
      description: data.description,
      priority: data.priority,
      startAt: data.startAt,
      endAt: data.endAt,
      space_id: space.id,
      recurrency: data.recurrent ? "daily" : null,
    })
    .where(and(eq(tasks.userId, user.userId), eq(tasks.id, data.id)))
    .returning();
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

  const existingSpace = await getSpaceByName(data.name);
  if (existingSpace) throw new Error("A space with this name already exists");

  const parentSpaceId = await getParentSpaceId(data.parent_space);

  return await db
    .insert(spaces)
    .values({
      userId: user.userId,
      ...data,
      parent_space: parentSpaceId,
    })
    .returning();
}

async function getParentSpaceId(parentSpaceName: string) {
  if (parentSpaceName === "") return -1;

  const parentSpace = await getSpaceByName(parentSpaceName);
  if (!parentSpace) throw new Error("Parent space not found");

  return parentSpace.id;
}

export async function deleteTask(data: z.infer<typeof deleteTaskSchema>) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  await db
    .delete(tasks)
    .where(and(eq(tasks.userId, user.userId), eq(tasks.id, data.id)));
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
