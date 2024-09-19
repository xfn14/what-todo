"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { toggleTasksCompletionAction } from "~/server/actions/actions";
import { colorClasses } from "~/server/db/schema";
import { Space, Task } from "~/types";
import { formatedTimestamp, truncateTaskTitle } from "~/utils/strings";
import { AddTaskButton } from "./add-task-button";

export interface TaskListProps {
  tasks: Task[];
  spaces: Space[];
}

const sortOptions = [
  { value: "createdAt", label: "Created At" },
  { value: "startAt", label: "Started At" },
  { value: "priority", label: "Priority" },
  { value: "isComplete", label: "Is completed" },
];

export function AllTasksList({ tasks: initialTasks, spaces }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [disabeledTasks, setDisabledTasks] = useState<number[]>([]);
  const [sortCriterion, setSortCriterion] = useState<string>("createdAt");

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const getLabelForSortCriterion = (value: string) => {
    const option = sortOptions.find((option) => option.value === value);
    return option ? option.label : "Unknown";
  };

  const sortTasks = (tasksToSort: Task[]) => {
    return [...tasksToSort].sort((a, b) => {
      switch (sortCriterion) {
        case "createdAt":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "startAt":
          return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
        case "priority":
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "isComplete":
          return a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1;
        default:
          return 0;
      }
    });
  };

  const sortedTasks = sortTasks(tasks);

  const toggleTask = async (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task,
      ),
    );

    if (disabeledTasks.includes(id)) {
      setDisabledTasks((prev) => prev.filter((taskId) => taskId !== id));
    } else {
      setDisabledTasks((prev) => [...prev, id]);
    }

    await toggleTasksCompletionAction({ taskId: id });

    setDisabledTasks((prev) => prev.filter((taskId) => taskId !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">All Tasks</span>
            <AddTaskButton spaces={spaces} />
          </div>

          <div className="flex flex-col items-start gap-1 text-xs">
            <label htmlFor="sort ">Sort by:</label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-32">
                  {getLabelForSortCriterion(sortCriterion)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortCriterion(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {sortedTasks.map((task) => {
            const space = spaces.find((space) => space.id === task.space_id);
            const truncatedTitle = truncateTaskTitle(task.title, 45);
            const colorClass = space ? colorClasses[space.color] : "";

            return (
              <div key={task.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`all-${task.id}`}
                  checked={task.isComplete}
                  onCheckedChange={() => toggleTask(task.id)}
                  disabled={disabeledTasks.includes(task.id)}
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
