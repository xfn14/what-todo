"use client";

import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useTasksStore } from "~/stores/tasks-store";
import { Task } from "~/types";

export interface EditTaskFormProps {
  taskId: number;
}

export function EditTaskForm({ taskId }: EditTaskFormProps) {
  const getTask = useTasksStore((state) => state.getTask);
  const task = getTask(taskId);

  if (!task) {
    return <span className="text-destructive">Failed to load task</span>;
  }

  function updateTask(task: Task): void {
    throw new Error("Function not implemented.");
  }

  function deleteTask(id: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="space-y-4 py-4">
        <div>
          <Label htmlFor="edit-title">Title</Label>
          <Input id="edit-title" value={task.title} />
        </div>
        <div>
          <Label htmlFor="edit-description">Description</Label>
          <Textarea id="edit-description" value={task.description ?? ""} />
        </div>
        <div>
          <Label htmlFor="edit-priority">Priority</Label>
          <Select value={task.priority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="edit-startTime">Start Time</Label>
          <Input
            id="edit-startTime"
            type="time"
            value={task.startAt.getDate()}
          />
        </div>
        <div>
          <Label htmlFor="edit-endTime">End Time</Label>
          <Input id="edit-endTime" type="time" value={task.endAt?.getDate()} />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Button variant="outline" onClick={() => updateTask(task)}>
          Save Changes
        </Button>
        <Button variant="destructive" onClick={() => deleteTask(task.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Task
        </Button>
      </div>
    </>
  );
}
