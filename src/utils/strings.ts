export function truncateTaskTitle(title: string, maxLength = 40): string {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  }
  return title;
}

export const formatDate = (d: Date) => {
  const date = d.toISOString().split("T")[0];
  return `${date}`;
};

export const formatTime = (d: Date) => {
  const time = d.toTimeString().split(" ")[0];
  return `${time}`;
};

export const formatDateTime = (d: Date) => {
  const date = formatDate(d);
  const time = formatTime(d);
  return `${date} ${time}`;
};

export const formatWeekDays = (weekDays: string) => {
  const weekDaysArray = weekDays.split(",");
  if (weekDaysArray.length === 7) return "Every day";
  if (weekDaysArray.length === 0) return "Never";

  return weekDaysArray
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1, 3))
    .join(", ");
};

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
