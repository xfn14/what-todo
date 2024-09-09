export function truncateTaskTitle(
  title: string,
  maxLength: number = 40,
): string {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  }
  return title;
}

export const formatedTimestamp = (d: Date) => {
  const date = d.toISOString().split("T")[0];
  const time = d.toTimeString().split(" ")[0];
  return `${date} ${time}`;
};