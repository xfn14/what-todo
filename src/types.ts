export interface Task {
  id: number;
  userId: string;
  title: string;
  space_id: number;
  description: string | null;
  isComplete: boolean;
  priority: "low" | "medium" | "high";
  startAt: Date;
  endAt: Date | null;
  recurrency: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Space {
  id: number;
  userId: string;
  name: string;
  color: "red" | "green" | "blue" | "yellow" | "purple";
  parent_space: number;
  createdAt: Date;
  updatedAt: Date | null;
}
