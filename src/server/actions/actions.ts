"use server";

import { createServerAction } from "zsa";
import {
  createSpace,
  createTask,
  deleteTask,
  toggleTaskCompletion,
  updateTask,
} from "../db/queries";
import {
  addSpaceSchema,
  addTaskSchema,
  deleteTaskSchema,
  toggleTasksCompletionSchema,
  updateTaskSchema,
} from "./schemas";

export const createTaskAction = createServerAction()
  .input(addTaskSchema)
  .handler(async ({ input }) => {
    return await createTask(input);
  });

export const updateTaskAction = createServerAction()
  .input(updateTaskSchema)
  .handler(async ({ input }) => {
    return await updateTask(input);
  });

export const deleteTaskAction = createServerAction()
  .input(deleteTaskSchema)
  .handler(async ({ input }) => {
    return await deleteTask(input);
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
