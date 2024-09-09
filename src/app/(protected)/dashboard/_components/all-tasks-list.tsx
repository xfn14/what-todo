"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { AddTaskButton } from "./add-task-button";
import { formatedTimestamp, truncateTaskTitle } from "~/utils/strings";

export interface TaskListProps {
  tasks: Task[];
  spaces: Space[];
}

export interface Task {
  id: number;
  title: string;
  space_id: number;
  description: string | null;
  priority: "low" | "medium" | "high";
  startAt: Date;
  endAt: Date | null;
  userId: string;
  isComplete: boolean;
  recurrency: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Space {
  id: number;
  userId: string;
  name: string;
  color: "red" | "green" | "blue" | "yellow" | "purple";
  createdAt: Date;
  updatedAt: Date | null;
}

export function AllTasksList({ tasks, spaces }: TaskListProps) {
  const toggleTask = (id: number) => {
    {
      /* TODO: Toggle task finished */
    }
    console.log(`Toggle task ${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span>All Tasks</span>
          <AddTaskButton spaces={spaces} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2">
              <Checkbox
                id={`all-${task.id}`}
                checked={task.isComplete}
                onCheckedChange={() => toggleTask(task.id)}
              />

              <Label
                htmlFor={`all-${task.id}`}
                className={`flex-grow ${task.isComplete ? "text-muted-foreground line-through" : ""}`}
              >
                <span className="md:hidden">
                  {truncateTaskTitle(task.title, 20)}
                </span>

                <span className="hidden md:flex">
                  {truncateTaskTitle(task.title, 45)}
                </span>
              </Label>

              <span className="text-sm text-muted-foreground">
                {formatedTimestamp(task.startAt)}
              </span>

              <span
                className={`rounded-full px-2 py-1 text-sm ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {task.priority}
              </span>

              <span className={`rounded-full px-2 py-1 text-sm`}>
                {spaces.find((space) => space.id === task.space_id)?.name ||
                  "Error finding space"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
