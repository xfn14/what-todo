"use client";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "~/components/ui/menubar";
import { Space } from "~/types";

export interface SelectSpaceMenuProps {
  spaces: Space[];
}

export function SelectSpaceMenu({ spaces }: SelectSpaceMenuProps) {
  const getChildSpaces = (parentId: number) => {
    return spaces.filter((space) => space.parent_space === parentId);
  };

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
