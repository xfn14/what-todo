export interface Task {
  id: number;
  title: string;
  space_id: number;
  description: string | null;
  priority: "low" | "medium" | "high";
  startAt: Date;
  endAt: Date | null;
  userId: string;
  isComplete: boolean;
  recurrency: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Space {
  id: number;
  userId: string;
  name: string;
  color: "red" | "green" | "blue" | "yellow" | "purple";
  parent_space: number | null;
  createdAt: Date;
  updatedAt: Date | null;
}
