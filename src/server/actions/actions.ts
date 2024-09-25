"use server";

import { createServerAction } from "zsa";
import { createSpace, createTask, toggleTaskCompletion } from "../db/queries";
import {
  addSpaceSchema,
  taskSchema,
  toggleTasksCompletionSchema,
} from "./schemas";

export const createTaskAction = createServerAction()
  .input(taskSchema)
  .handler(async ({ input }) => {
    return await createTask(input);
  });

export const createSpaceAction = createServerAction()
  .input(addSpaceSchema)
  .handler(async ({ input }) => {
    return await createSpace(input);
  });

export const toggleTasksCompletionAction = createServerAction()
  .input(toggleTasksCompletionSchema)
  .handler(async ({ input }) => {
    return await toggleTaskCompletion(input);
  });
