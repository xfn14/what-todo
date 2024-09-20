import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  pgEnum,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `t3-what-todo_${name}`);

export const spaceColor = ["red", "green", "blue", "yellow", "purple"] as const;
export const colorClasses = {
  red: "bg-red-800 text-red-300",
  green: "bg-green-800 text-green-300",
  blue: "bg-blue-800 text-blue-300",
  yellow: "bg-yellow-800 text-yellow-300",
  purple: "bg-purple-800 text-purple-300",
};
export const spaceColorEnum = pgEnum("color", spaceColor);

export const spaces = createTable("spaces", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  name: varchar("name", { length: 256 }).notNull(),
  color: spaceColorEnum("color").default("red").notNull(),
  parent_space: integer("parent_space").default(-1).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const spacesRelations = relations(spaces, ({ many }) => ({
  tasks: many(tasks),
}));

export const taskPriorities = ["low", "medium", "high"] as const;
export const taskPriorityEnum = pgEnum("task_priority", taskPriorities);

export const tasks = createTable("tasks", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  title: varchar("name", { length: 256 }).notNull(),
  space_id: integer("space_id")
    .notNull()
    .references(() => spaces.id, { onDelete: "cascade" }),
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
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  tasks: one(spaces, {
    fields: [tasks.space_id],
    references: [spaces.id],
  }),
}));
