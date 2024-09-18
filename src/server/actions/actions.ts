"use server";

import { createServerAction } from "zsa";
import { createSpace, createTask } from "../db/queries";
import { addSpaceSchema, addTaskSchema } from "./schemas";

export const createTaskAction = createServerAction()
  .input(addTaskSchema)
  .handler(async ({ input }) => {
    return await createTask(input);
  });

export const createSpaceAction = createServerAction()
  .input(addSpaceSchema)
  .handler(async ({ input }) => {
    return await createSpace(input);
  });
