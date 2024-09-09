"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { formatedTimestamp } from "~/utils/time-picker-utils";
import { AddTaskButton } from "./add-task-button";

export interface TaskListProps {
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  space: string;
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

export function AllTasksList({ tasks }: TaskListProps) {
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
          <AddTaskButton />
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
                {task.title}
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
                {task.space}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
