import { create } from "zustand";
import { getMySpaces } from "~/server/db/queries";
import type { Space } from "~/types";

interface SpacesState {
  spaces: Space[];
  initSpaces: () => void;
  getSpace: (space_id: number) => Space | undefined;
  updateSpace: (updatedSpace: Space) => void;
  getParentlessSpaces: () => Space[];
  getChildSpaces: (parentId: number) => Space[];
}

export const useSpacesStore = create<SpacesState>((set, get) => ({
  spaces: [],
  initSpaces: () => {
    getMySpaces()
      .then((fetchedSpaces) => {
        set({ spaces: fetchedSpaces });
      })
      .catch((error) => {
        console.error("Failed to fetch spaces:", error);
      });
  },
  getSpace: (space_id) => {
    return get().spaces.find((space) => space.id === space_id);
  },
  updateSpace: (space) => {
    set((state) => {
      const existingSpaceIndex = state.spaces.findIndex(
        (s) => s.id === space.id,
      );
      if (existingSpaceIndex !== -1) {
        return {
          spaces: state.spaces.map((s) => (s.id === space.id ? space : s)),
        };
      } else {
        return {
          spaces: [space, ...state.spaces],
        };
      }
    });
  },
  getParentlessSpaces: () => {
    const spaces = get().spaces;
    return spaces.filter((space) => space.parent_space === -1);
  },
  getChildSpaces: (parentId: number) => {
    const spaces = get().spaces;
    return spaces.filter((space) => space.parent_space === parentId);
  },
}));
