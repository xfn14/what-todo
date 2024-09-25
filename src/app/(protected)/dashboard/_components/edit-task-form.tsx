"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker from "~/components/form-fields/date-picker";
import PrioritySelection from "~/components/form-fields/priority-selection";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { DialogClose } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { deleteTaskAction, updateTaskAction } from "~/server/actions/actions";
import { updateTaskSchema } from "~/server/actions/schemas";
import { useSpacesStore } from "~/stores/spaces-store";
import { useTasksStore } from "~/stores/tasks-store";
import type { Task } from "~/types";

export interface EditTaskFormProps {
  task: Task;
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const spaces = useSpacesStore((state) => state.spaces);
  const getSpace = useSpacesStore((state) => state.getSpace);
  const updateTask = useTasksStore((state) => state.updateTask);
  const removeTask = useTasksStore((state) => state.removeTask);

  const closeButton = useRef<HTMLButtonElement>(null);
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: task.id,
      title: task.title,
      space: getSpace(task.space_id)?.name ?? "",
      description: task.description ?? "",
      priority: task.priority ?? "low",
      startAt: task.startAt ?? new Date(),
      endAt: task.endAt ?? undefined,
      recurrent: false,
    },
  });

  async function onSubmit(data: z.infer<typeof updateTaskSchema>) {
    setDisabled(true);

    try {
      const [res, err] = await updateTaskAction({
        id: data.id,
        title: data.title,
        space: data.space,
        description: data.description,
        priority: data.priority,
        startAt: data.startAt,
        endAt: data.endAt,
        recurrent: data.recurrent,
      });

      if (err) {
        console.error("Task update failed due to an error", err);
        return;
      } else if (res) {
        console.log("Task updated successfully:", res);
        updateTask(res[0] as Task);
        closeButton.current?.click();
      }
    } catch (error) {
      console.error("Task update failed due to an exception", error);
    } finally {
      setDisabled(false);
    }
  }

  async function onDelete() {
    setDisabled(true);

    try {
      const [res, err] = await deleteTaskAction({
        id: task.id,
      });

      if (err) {
        console.error("Task deletion failed due to an error", err);
        return;
      } else if (res) {
        console.log("Task deleted successfully:", res);
        removeTask(task.id);
        closeButton.current?.click();
      }
    } catch (error) {
      console.error("Task deletion failed due to an exception", error);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter the title" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="space"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space</FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {spaces.map((space) => (
                    <SelectItem key={space.name} value={space.name}>
                      {space.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  placeholder="Write some information about the task."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <PrioritySelection control={form.control} />

        <DatePicker control={form.control} name="startAt" />

        <DatePicker control={form.control} name="endAt" />

        <FormField
          control={form.control}
          name="recurrent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Recurrent</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex w-full gap-4">
          <Button
            type="submit"
            variant="secondary"
            className="w-full"
            disabled={disabled}
          >
            Save changes
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            className="w-12"
          >
            <Trash className="h-6 w-6" />
          </Button>
        </div>

        <DialogClose asChild>
          <Button type="reset" ref={closeButton} className="sr-only">
            Close
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
