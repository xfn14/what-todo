"use client";

import { useEffect } from "react";
import { useSpacesStore } from "~/stores/spaces-store";
import { useTasksStore } from "~/stores/tasks-store";
import Dashboard from "./_components/dashboard";

const DashboardPage = () => {
  const initSpaces = useSpacesStore((state) => state.initSpaces);
  const initTasks = useTasksStore((state) => state.initTasks);

  useEffect(() => {
    initSpaces();
    initTasks();
  }, [initSpaces, initTasks]);

  return (
    <main className="mt-2 flex w-full flex-col px-6 py-2">
      <Dashboard />
    </main>
  );
};

export default DashboardPage;
