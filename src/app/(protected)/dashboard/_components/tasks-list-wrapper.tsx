"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TasksList } from "./tasks-list";
import { Space, Task } from "~/types";

interface TasksListWrapperProps {
  initialTasks: Task[];
  spaces: Space[];
}

export function TasksListWrapper({
  initialTasks,
  spaces,
}: TasksListWrapperProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  const getTodaysTasks = () => {
    const today = new Date();
    return tasks.filter((task) => {
      const startAt = new Date(task.startAt);
      return (
        startAt.getDate() === today.getDate() &&
        startAt.getMonth() === today.getMonth() &&
        startAt.getFullYear() === today.getFullYear()
      );
    });
  };

  return (
    <Tabs defaultValue="all_tasks">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="all_tasks">All tasks</TabsTrigger>
        <TabsTrigger value="todays_tasks">Today&apos;s tasks</TabsTrigger>
      </TabsList>

      <TabsContent value="all_tasks">
        <TasksList
          title="All tasks"
          tasks={tasks}
          spaces={spaces}
          onTaskUpdate={handleTaskUpdate}
        />
      </TabsContent>

      <TabsContent value="todays_tasks">
        <TasksList
          title="Today's tasks"
          tasks={getTodaysTasks()}
          spaces={spaces}
          onTaskUpdate={handleTaskUpdate}
        />
      </TabsContent>
    </Tabs>
  );
}
