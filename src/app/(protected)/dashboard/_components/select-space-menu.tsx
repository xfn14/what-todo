"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { useSpacesStore } from "~/stores/spaces-store";

export function SelectSpaceMenu() {
  const spaces = useSpacesStore((state) => state.spaces);
  const getChildSpaces = useSpacesStore((state) => state.getChildSpaces);

  return (
    <>
      {spaces.length > 0 && (
        <Menubar className="no-scrollbar flex overflow-y-hidden overflow-x-scroll">
          {spaces
            .filter(
              (space) =>
                space.parent_space === -1 || space.parent_space === null,
            )
            .map((space) => (
              <MenubarMenu key={space.id}>
                <MenubarTrigger>{space.name}</MenubarTrigger>

                {getChildSpaces(space.id).length > 0 && (
                  <MenubarContent>
                    {getChildSpaces(space.id).map((childSpace) => (
                      <MenubarItem key={childSpace.id}>
                        {childSpace.name}
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                )}
              </MenubarMenu>
            ))}
        </Menubar>
      )}
    </>
  );
}
