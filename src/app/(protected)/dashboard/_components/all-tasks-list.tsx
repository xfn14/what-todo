"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { AddTaskButton } from "./add-task-button";
import { formatedTimestamp, truncateTaskTitle } from "~/utils/strings";
import { cn } from "~/lib/utils";
import { colorClasses } from "~/server/db/schema";
import { Space, Task } from "~/types";

export interface TaskListProps {
  tasks: Task[];
  spaces: Space[];
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
          {tasks.map((task) => {
            const space = spaces.find((space) => space.id === task.space_id);
            const truncatedTitle = truncateTaskTitle(task.title, 45);
            const colorClass = space ? colorClasses[space.color] : "";

            return (
              <div key={task.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`all-${task.id}`}
                  checked={task.isComplete}
                  onCheckedChange={() => toggleTask(task.id)}
                />

                <Label
                  htmlFor={`all-${task.id}`}
                  className={`flex-grow ${
                    task.isComplete ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  <span className="md:hidden">
                    {truncateTaskTitle(task.title, 20)}
                  </span>

                  <span className="hidden md:flex">{truncatedTitle}</span>
                </Label>

                <span className="text-sm text-muted-foreground">
                  {formatedTimestamp(task.startAt)}
                </span>

                <span
                  className={cn("rounded-full px-2 py-1 text-sm", {
                    "bg-red-100 text-red-800": task.priority === "high",
                    "bg-yellow-100 text-yellow-800": task.priority === "medium",
                    "bg-green-100 text-green-800": task.priority === "low",
                  })}
                >
                  {task.priority}
                </span>

                {space ? (
                  <span
                    className={cn("rounded-full px-2 py-1 text-sm", colorClass)}
                  >
                    {space.name}
                  </span>
                ) : (
                  <span className="text-sm text-red-500">
                    Error finding space
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
