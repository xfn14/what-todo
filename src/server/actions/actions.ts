"use server";

import { createServerAction } from "zsa";
import { createTask } from "../queries";
import { addTaskSchema } from "./schemas";

export const createTaskAction = createServerAction()
  .input(addTaskSchema)
  .handler(async ({ input }) => {
    return await createTask(input);
  });
