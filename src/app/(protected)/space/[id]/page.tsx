"use client";

import { useEffect, useState } from "react";
import { useSpacesStore } from "~/stores/spaces-store";
import { TasksListTabs } from "../../dashboard/_components/tasks-list-tabs";
import { SelectSpaceMenu } from "../../dashboard/_components/select-space-menu";
import { useTasksStore } from "~/stores/tasks-store";

const SpacePage = ({
  params: { id: space_id },
}: {
  params: { id: number };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const initSpaces = useSpacesStore((state) => state.initSpaces);
  const initSpaceTasks = useTasksStore((state) => state.initSpaceTasks);
  const getSpace = useSpacesStore((state) => state.getSpace);

  useEffect(() => {
    const initialize = async () => {
      await initSpaces();

      const space = getSpace(Number(space_id));
      if (!space) {
        setIsLoading(false);
        return;
      }

      initSpaceTasks(space_id);
      setIsLoading(false);
    };
    void initialize();
  }, [initSpaces]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const space = getSpace(Number(space_id));

  if (!space) {
    return <div>Space not found</div>;
  }

  return (
    <div className="mt-2 flex w-full flex-col px-6 py-2">
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <h1 className="text-2xl font-bold">{space.name}</h1>
      </div>

      <div className="my-2 flex flex-col gap-4">
        <SelectSpaceMenu selectedSpaceId={space.id} />

        <TasksListTabs selectedSpaceId={space.id} />
      </div>
    </div>
  );
};

export default SpacePage;
