import { z } from "zod";
import { spaceColor } from "../db/schema";

export const taskSchema = z.object({
  title: z.string().min(1),
  space: z.string().min(1),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  startAt: z.date(),
  endAt: z.date().optional(),
  recurrent: z.boolean().default(false).optional(),
});

export const addSpaceSchema = z.object({
  name: z.string().min(1).max(16),
  color: z.enum(spaceColor).default("red"),
  parent_space: z.string().default(""),
});

export const toggleTasksCompletionSchema = z.object({
  taskId: z.number(),
});
