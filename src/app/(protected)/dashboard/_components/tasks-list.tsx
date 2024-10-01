"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
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
import { toggleTasksCompletionAction } from "~/server/actions/actions";
import { useSpacesStore } from "~/stores/spaces-store";
import { useTasksStore } from "~/stores/tasks-store";
import type { Task } from "~/types";
import {
  formatDate,
  formatDateTime,
  formatTime,
  formatWeekDays,
  truncateTaskTitle,
  upperCaseFirstLetter,
} from "~/utils/strings";
import { AddTaskButton } from "./add-task-button";
import { Badge } from "~/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { EditTaskForm } from "./edit-task-form";

const sortOptions = [
  { value: "startAt", label: "Start time" },
  { value: "isComplete", label: "Completion" },
  { value: "priority", label: "Priority" },
  { value: "createdAt", label: "Creation" },
];

export interface TaskListProps {
  type: string;
  title: string;
  selectedSpaceId?: number;
}

export function TasksList({
  type,
  title,
  selectedSpaceId = -1,
}: TaskListProps) {
  const tasks = useTasksStore((state) => state.tasks);
  const updateTask = useTasksStore((state) => state.updateTask);
  const getTodaysTasks = useTasksStore((state) => state.getTodaysTasks);
  const spaces = useSpacesStore((state) => state.spaces);

  const todays_tasks = getTodaysTasks();
  const [disabeledTasks, setDisabledTasks] = useState<number[]>([]);
  const [sortCriterion, setSortCriterion] = useState<string>("startAt");
  const [isAscending, setIsAscending] = useState<boolean>(false);

  const getLabelForSortCriterion = (value: string) => {
    const option = sortOptions.find((option) => option.value === value);
    return option ? option.label : "Unknown";
  };

  const sortTasks = (tasksToSort: Task[]) => {
    const sorted = [...tasksToSort].sort((a, b) => {
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

    return isAscending ? sorted : sorted.reverse();
  };

  const toggleTask = async (id: number) => {
    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      updatedTask.isComplete = !updatedTask.isComplete;

      setDisabledTasks((prev) => [...prev, id]);
      await toggleTasksCompletionAction({ taskId: id });

      updateTask(updatedTask);
      setDisabledTasks((prev) => prev.filter((taskId) => taskId !== id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-2xl font-bold">{title}</span>
            <AddTaskButton />
          </div>

          <div className="flex flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-32" id="sort_by">
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

            <Button
              id="order_by"
              size={"icon"}
              variant={"outline"}
              onClick={() => setIsAscending((prev) => !prev)}
            >
              {isAscending ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {sortTasks(type === "todays_tasks" ? todays_tasks : tasks).length ===
          0 ? (
            <div className="text-muted-foreground">No tasks!</div>
          ) : (
            <>
              {sortTasks(type === "todays_tasks" ? todays_tasks : tasks).map(
                (task) => {
                  const space = spaces.find(
                    (space) => space.id === task.space_id,
                  );
                  const truncatedTitle = truncateTaskTitle(task.title, 45);

                  return (
                    <div
                      key={task.id}
                      className="flex flex-wrap items-center space-x-2"
                    >
                      <Checkbox
                        id={`all-${task.id}`}
                        checked={task.isComplete}
                        onCheckedChange={() => toggleTask(task.id)}
                        disabled={disabeledTasks.includes(task.id)}
                      />

                      <Sheet>
                        <SheetTrigger asChild>
                          <Label
                            // htmlFor={`all-${task.id}`}
                            className={`flex-grow hover:cursor-pointer hover:underline ${
                              task.isComplete
                                ? "text-muted-foreground line-through"
                                : ""
                            }`}
                          >
                            <span className="md:hidden">
                              {truncateTaskTitle(truncatedTitle, 20)}
                            </span>

                            <span className="hidden md:flex">
                              {truncatedTitle}
                            </span>
                          </Label>
                        </SheetTrigger>
                        <SheetContent className="tiny-scrollbar overflow-scroll overflow-x-hidden">
                          <SheetHeader>
                            <SheetTitle>{truncatedTitle}</SheetTitle>
                            <SheetDescription>
                              Make changes to your task here. Click save when
                              you&apos;re done.
                            </SheetDescription>

                            <EditTaskForm task={task} />
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>

                      <span className="text-sm text-muted-foreground">
                        {(type === "all_tasks"
                          ? task.recurrency === ""
                            ? formatDate(task.startAt) + " at "
                            : formatWeekDays(task.recurrency) + " at "
                          : "") + formatTime(task.startAt)}
                      </span>

                      <Badge
                        variant={
                          task.priority === "high"
                            ? "redbg"
                            : task.priority === "medium"
                              ? "yellowbg"
                              : "greenbg"
                        }
                      >
                        {upperCaseFirstLetter(task.priority)}
                      </Badge>

                      {selectedSpaceId === -1 && (
                        <>
                          {space ? (
                            <Badge variant={space.color}>{space.name}</Badge>
                          ) : (
                            <Badge variant={"red"}>Error finding space</Badge>
                          )}
                        </>
                      )}
                    </div>
                  );
                },
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
