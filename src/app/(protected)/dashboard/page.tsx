"use client";

import Dashboard from "./_components/dashboard";
import { useTasksStore } from "~/stores/tasks-store";
import { useEffect } from "react";
import { getMyTasks } from "~/server/db/queries";
import { useSpacesStore } from "~/stores/spaces-store";

const DashboardPage = () => {
  const spaces = useSpacesStore((state) => state.spaces);
  const initSpaces = useSpacesStore((state) => state.initSpaces);

  const tasks = useTasksStore((state) => state.tasks);
  const initTasks = useTasksStore((state) => state.initTasks);

  useEffect(() => {
    initSpaces();
    initTasks();
  }, [initSpaces, initTasks]);

  return <Dashboard />;
};

export default DashboardPage;
