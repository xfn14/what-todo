import { z } from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(1),
  space: z.string().min(1),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  startAt: z.date(),
  endAt: z.date().optional(),
  recurrent: z.boolean().default(false).optional(),
});
