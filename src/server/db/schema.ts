// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3-what-todo_${name}`);

export const taskPriorities = ["low", "medium", "high"] as const;
export const taskPriorityEnum = pgEnum("task_priority", taskPriorities);

export const tasks = createTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    title: varchar("name", { length: 256 }).notNull(),
    space: varchar("space", { length: 256 }).notNull(),
    description: varchar("description", { length: 1024 }),
    isComplete: boolean("is_complete").default(false).notNull(),
    priority: taskPriorityEnum("priority").default("low").notNull(),

    startAt: timestamp("start_at", { withTimezone: true }).notNull(),
    endAt: timestamp("end_at", { withTimezone: true }),
    recurrency: varchar("recurrent"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    startAtIndex: index("startAt_idx").on(example.startAt),
  }),
);
