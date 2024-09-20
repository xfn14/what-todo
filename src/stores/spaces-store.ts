import { create } from "zustand";
import { getMySpaces } from "~/server/db/queries";
import { Space } from "~/types";

interface SpacesState {
  spaces: Space[];
  initSpaces: () => void;
  updateSpace: (updatedSpace: Space) => void;
  getParentlessSpaces: () => Space[];
  getChildSpaces: (parentId: number) => Space[];
}

export const useSpacesStore = create<SpacesState>((set, get) => ({
  spaces: [],
  initSpaces: async () => {
    const fetchedSpaces = await getMySpaces();
    set({ spaces: fetchedSpaces });
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
