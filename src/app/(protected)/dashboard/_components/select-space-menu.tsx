"use client";

import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { useSpacesStore } from "~/stores/spaces-store";

export interface SelectSpaceMenuProps {
  selectedSpaceId?: number;
}

export function SelectSpaceMenu({
  selectedSpaceId = -1,
}: SelectSpaceMenuProps) {
  const spaces = useSpacesStore((state) => state.spaces);
  const getChildSpaces = useSpacesStore((state) => state.getChildSpaces);

  return (
    <>
      {spaces.length > 0 && (
        <div className="no-scrollbar flex items-center gap-2 overflow-y-hidden overflow-x-scroll rounded-md border bg-background">
          {spaces
            .filter(
              (space) =>
                space.parent_space === -1 || space.parent_space === null,
            )
            .map((space) => {
              const childSpaces = getChildSpaces(space.id);

              if (childSpaces.length === 0) {
                return (
                  <div key={space.id}>
                    <SpacePageButton
                      id={space.id}
                      name={space.name}
                      selected={selectedSpaceId}
                    />
                  </div>
                );
              }

              return (
                <HoverCard key={space.id} openDelay={100} closeDelay={100}>
                  <HoverCardTrigger>
                    <SpacePageButton
                      id={space.id}
                      name={space.name}
                      selected={selectedSpaceId}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent
                    sideOffset={0}
                    className="w-auto text-center"
                  >
                    {childSpaces.map((childSpace) => (
                      <div key={childSpace.id}>
                        <SpacePageButton
                          id={childSpace.id}
                          name={childSpace.name}
                          selected={selectedSpaceId}
                        />
                      </div>
                    ))}
                  </HoverCardContent>
                </HoverCard>
              );
            })}
        </div>
      )}
    </>
  );
}

const SpacePageButton = ({
  id,
  name,
  selected,
}: {
  id: number;
  name: string;
  selected: number;
}) => {
  return (
    <Button size={"sm"} variant={selected === id ? "outline" : "link"}>
      <Link href={`/space/${id}`}>{name}</Link>
    </Button>
  );
};
