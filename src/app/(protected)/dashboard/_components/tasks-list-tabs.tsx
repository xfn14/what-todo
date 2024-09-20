"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TasksList } from "./tasks-list";

export function TasksListTabs() {
  return (
    <Tabs defaultValue="all_tasks">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="all_tasks">All tasks</TabsTrigger>
        <TabsTrigger value="todays_tasks">Today&apos;s tasks</TabsTrigger>
      </TabsList>

      <TabsContent value="all_tasks">
        <TasksList type="all_tasks" />
      </TabsContent>

      <TabsContent value="todays_tasks">
        <TasksList type="todays_tasks" />
      </TabsContent>
    </Tabs>
  );
}
