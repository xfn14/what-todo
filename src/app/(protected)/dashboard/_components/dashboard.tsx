"use client";

import { useEffect } from "react";
import { useTasksStore } from "~/stores/tasks-store";
import { Space, Task } from "~/types";
import { TasksListTabs } from "./tasks-list-tabs";
import { AddSpaceButton } from "./add-space-button";
import { SelectSpaceMenu } from "./select-space-menu";
import { useSpacesStore } from "~/stores/spaces-store";

export interface DashboardProps {
  tasks: Task[];
  spaces: Space[];
}

const Dashboard = () => {
  const spaces = useSpacesStore((state) => state.spaces);

  return (
    <main className="mt-2 flex w-full flex-col justify-center px-6 py-2">
      <div className="mb-2 flex items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddSpaceButton />
      </div>

      <div className="my-2 flex flex-col gap-4">
        <SelectSpaceMenu />

        {spaces.length === 0 ? (
          <div className="text-muted-foreground">
            You don&apos;t have any spaces yet. Create one to start adding
            tasks.
          </div>
        ) : (
          <TasksListTabs />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
