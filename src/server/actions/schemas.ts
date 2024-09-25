import { z } from "zod";
import { spaceColor } from "../db/schema";

export const addTaskSchema = z.object({
  title: z.string().min(1),
  space: z.string().min(1),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  startAt: z.date(),
  endAt: z.date().optional(),
  recurrent: z.boolean().default(false),
});

export const updateTaskSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  space: z.string().min(1),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  startAt: z.date(),
  endAt: z.date().optional(),
  recurrent: z.boolean().default(false),
});

export const deleteTaskSchema = z.object({
  id: z.number(),
});

export const addSpaceSchema = z.object({
  name: z.string().min(1).max(16),
  color: z.enum(spaceColor).default("red"),
  parent_space: z.string().default(""),
});

export const toggleTasksCompletionSchema = z.object({
  taskId: z.number(),
});
