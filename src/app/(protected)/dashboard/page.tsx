"use client";

import Dashboard from "./_components/dashboard";
import { useTasksStore } from "~/stores/tasks-store";
import { useEffect } from "react";
import { useSpacesStore } from "~/stores/spaces-store";

const DashboardPage = () => {
  const initSpaces = useSpacesStore((state) => state.initSpaces);
  const initTasks = useTasksStore((state) => state.initTasks);

  useEffect(() => {
    initSpaces();
    initTasks();
  }, [initSpaces, initTasks]);

  return <Dashboard />;
};

export default DashboardPage;
