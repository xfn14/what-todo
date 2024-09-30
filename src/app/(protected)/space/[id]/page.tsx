"use client";

import { useEffect, useState } from "react";
import { useSpacesStore } from "~/stores/spaces-store";

const SpacePage = ({
  params: { id: space_id },
}: {
  params: { id: number };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const initSpaces = useSpacesStore((state) => state.initSpaces);
  const getSpace = useSpacesStore((state) => state.getSpace);

  useEffect(() => {
    const initialize = async () => {
      await initSpaces();
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
    <div>
      <h1>{space.name}</h1>
    </div>
  );
};

export default SpacePage;
