import { create } from "zustand";
import { getMyTasks } from "~/server/db/queries";
import { Task } from "~/types";

interface TasksState {
  tasks: Task[];
  initTasks: () => void;
  updateTask: (updatedTask: Task) => void;
  getTodaysTasks: () => Task[];
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  initTasks: async () => {
    const fetchedTasks = await getMyTasks();
    set({ tasks: fetchedTasks });
  },
  updateTask: (task) => {
    set((state) => {
      const existingTaskIndex = state.tasks.findIndex((t) => t.id === task.id);
      if (existingTaskIndex !== -1) {
        return {
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        };
      } else {
        return {
          tasks: [task, ...state.tasks],
        };
      }
    });
  },
  getTodaysTasks: () => {
    const today = new Date();
    const tasks = get().tasks;
    return tasks.filter((task) => {
      const startAt = new Date(task.startAt);
      return (
        startAt.getDate() === today.getDate() &&
        startAt.getMonth() === today.getMonth() &&
        startAt.getFullYear() === today.getFullYear()
      );
    });
  },
}));
