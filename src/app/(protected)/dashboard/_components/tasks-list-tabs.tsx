"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TasksList } from "./tasks-list";
import { useSpacesStore } from "~/stores/spaces-store";

export interface TasksListTabsProps {
  selectedSpaceId?: number;
}

export function TasksListTabs({ selectedSpaceId = -1 }: TasksListTabsProps) {
  const getSpace = useSpacesStore((state) => state.getSpace);

  const spaceTasksTitle = getSpace(selectedSpaceId)?.name + "'s tasks";

  return (
    <Tabs defaultValue="todays_tasks">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="todays_tasks">Today&apos;s tasks</TabsTrigger>
        <TabsTrigger value="all_tasks">
          {selectedSpaceId === -1 ? "All tasks" : spaceTasksTitle}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="todays_tasks">
        <TasksList
          type="todays_tasks"
          title="Today's tasks"
          selectedSpaceId={selectedSpaceId}
        />
      </TabsContent>

      <TabsContent value="all_tasks">
        <TasksList
          type="all_tasks"
          title={selectedSpaceId === -1 ? "All tasks" : spaceTasksTitle}
          selectedSpaceId={selectedSpaceId}
        />
      </TabsContent>
    </Tabs>
  );
}
