"use client";

import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Menubar } from "~/components/ui/menubar";
import { useSpacesStore } from "~/stores/spaces-store";

export function SelectSpaceMenu() {
  const spaces = useSpacesStore((state) => state.spaces);
  const getChildSpaces = useSpacesStore((state) => state.getChildSpaces);

  return (
    <>
      {spaces.length > 0 && (
        <Menubar className="no-scrollbar flex gap-2 overflow-y-hidden overflow-x-scroll">
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
                    <SpacePageButton id={space.id} name={space.name} />
                  </div>
                );
              }

              return (
                <HoverCard key={space.id} openDelay={100} closeDelay={100}>
                  <HoverCardTrigger>
                    <SpacePageButton id={space.id} name={space.name} />
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
                        />
                      </div>
                    ))}
                  </HoverCardContent>
                </HoverCard>
              );
            })}
        </Menubar>
      )}
    </>
  );
}

const SpacePageButton = ({ id, name }: { id: number; name: string }) => {
  return (
    <Button size={"sm"} variant={"link"}>
      <Link href={`/space/${id}`}>{name}</Link>
    </Button>
  );
};
