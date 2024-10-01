import { create } from "zustand";
import { getMySpaceTasks, getMyTasks } from "~/server/db/queries";
import type { Task } from "~/types";

interface TasksState {
  tasks: Task[];
  initTasks: () => void;
  initSpaceTasks: (space_id: number) => void;
  getTask: (task_id: number) => Task | undefined;
  updateTask: (updatedTask: Task) => void;
  removeTask: (task_id: number) => void;
  getTodaysTasks: () => Task[];
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],

  initTasks: () => {
    getMyTasks()
      .then((fetchedTasks) => {
        set({ tasks: fetchedTasks });
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
      });
  },

  initSpaceTasks: (space_id) => {
    getMySpaceTasks(space_id)
      .then((fetchedTasks) => {
        set({ tasks: fetchedTasks });
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
      });
  },

  getTask: (task_id) => {
    return get().tasks.find((task) => task.id === task_id);
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

  removeTask: (task_id) => {
    set((state) => {
      return {
        tasks: state.tasks.filter((task) => task.id !== task_id),
      };
    });
  },

  getTodaysTasks: () => {
    const today = new Date();
    const tasks = get().tasks;

    const todayWeekDay = today
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();

    return tasks.filter((task) => {
      const startAt = new Date(task.startAt);

      if (task.recurrency && task.recurrency !== "") {
        const weekDays = task.recurrency.split(",");

        if (weekDays.includes(todayWeekDay)) {
          return true;
        }
      }

      return (
        startAt.getDate() === today.getDate() &&
        startAt.getMonth() === today.getMonth() &&
        startAt.getFullYear() === today.getFullYear()
      );
    });
  },
}));
