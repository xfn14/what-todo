import { Task } from "~/types";

export const getRecurrentTasksToUpdate = (tasks: Task[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return tasks
    .filter((task) => task.recurrency !== "" && task.isComplete)
    .filter((task) => {
      if (!task.lastCompletedAt) return false;

      const lastCompletedAt = new Date(task.lastCompletedAt);
      lastCompletedAt.setHours(0, 0, 0, 0);

      const weekDays = task.recurrency.split(",");
      const isWeekDay = weekDays.includes(
        today.toLocaleString("en-US", { weekday: "long" }).toLowerCase(),
      );

      return (
        lastCompletedAt < today &&
        isWeekDay &&
        lastCompletedAt.getDate() !== today.getDate()
      );
    });
};
