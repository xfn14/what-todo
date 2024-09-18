import "server-only";

import { auth } from "@clerk/nextjs/server";
import { and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { addSpaceSchema, addTaskSchema } from "../actions/schemas";
import { db } from ".";
import { spaces, tasks } from "./schema";
import { getErrorMessage } from "~/utils/strings";

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

export async function getSpaceById(space: number) {
  const user = auth();

  if (!user.userId) throw new Error("User not authenticated");

  return await db.query.spaces.findFirst({
    where: (model, { eq }) =>
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
  console.log(data);
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
