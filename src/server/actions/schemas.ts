import { z } from "zod";
import { spaceColor } from "../db/schema";

export const validWeekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export const weekDaysSchema = z.array(z.enum(validWeekDays)).optional();

export const addTaskSchema = z
  .object({
    title: z.string().min(1),
    space: z.string().min(1),
    description: z.string(),
    priority: z.enum(["low", "medium", "high"]),
    startAt: z.date(),
    endAt: z.date().optional(),
    recurrent: z.boolean().default(false),
    weekDays: weekDaysSchema,
  })
  .superRefine((data, ctx) => {
    if (data.recurrent && (!data.weekDays || data.weekDays.length === 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["weekDays"],
        message: "At least one weekday must be selected when recurrent is true",
      });
    }
  });

export const updateTaskSchema = z
  .object({
    id: z.number(),
    title: z.string().min(1),
    space: z.string().min(1),
    description: z.string(),
    priority: z.enum(["low", "medium", "high"]),
    startAt: z.date(),
    endAt: z.date().optional(),
    recurrent: z.boolean().default(false),
    weekDays: weekDaysSchema,
  })
  .superRefine((data, ctx) => {
    if (data.recurrent && (!data.weekDays || data.weekDays.length === 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["weekDays"],
        message: "At least one weekday must be selected when recurrent is true",
      });
    }
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
