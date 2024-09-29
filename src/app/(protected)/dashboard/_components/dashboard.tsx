"use client";

import { useSpacesStore } from "~/stores/spaces-store";
import { useTasksStore } from "~/stores/tasks-store";
import { AddSpaceButton } from "./add-space-button";
import { SelectSpaceMenu } from "./select-space-menu";
import { TasksListTabs } from "./tasks-list-tabs";
import TasksStats from "./tasks-stats";

const Dashboard = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const spaces = useSpacesStore((state) => state.spaces);

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddSpaceButton />
      </div>

      <div className="my-2 flex flex-col gap-4">
        <SelectSpaceMenu />

        {spaces.length > 0 && tasks.length > 0 && <TasksStats />}

        {spaces.length === 0 ? (
          <div className="text-muted-foreground">
            You don&apos;t have any spaces yet. Create one to start adding
            tasks.
          </div>
        ) : (
          <TasksListTabs />
        )}
      </div>
    </>
  );
};

export default Dashboard;
