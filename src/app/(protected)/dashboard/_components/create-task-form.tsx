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
import { createTaskAction } from "~/server/actions/actions";
import { addTaskSchema } from "~/server/actions/schemas";
import { useSpacesStore } from "~/stores/spaces-store";
import { useTasksStore } from "~/stores/tasks-store";
import type { Task } from "~/types";

export function CreateTaskForm() {
  const spaces = useSpacesStore((state) => state.spaces);
  const getSpace = useSpacesStore((state) => state.getSpace);
  const updateTask = useTasksStore((state) => state.updateTask);

  const closeButton = useRef<HTMLButtonElement>(null);
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      space: "",
      description: "",
      priority: "low",
      startAt: new Date(),
      endAt: undefined,
      recurrent: false,
    },
  });

  async function onSubmit(data: z.infer<typeof addTaskSchema>) {
    setDisabled(true);

    try {
      const [res, err] = await createTaskAction({
        title: data.title,
        space: data.space,
        description: data.description,
        priority: data.priority,
        startAt: data.startAt,
        endAt: data.endAt,
        recurrent: data.recurrent,
      });

      if (err) {
        console.error("Task creation failed due to an error", err);
        return;
      } else if (res) {
        console.log("Task created successfully:", res);
        updateTask(res[0] as Task);
        form.reset();
        closeButton.current?.click();
      }
    } catch (error) {
      console.error("Task creation failed due to an exception", error);
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

        <FormField
          control={form.control}
          name={"priority"}
          render={({ field }) => (
            <PrioritySelection onChange={field.onChange} value={field.value} />
          )}
        />

        <FormField
          control={form.control}
          name={"startAt"}
          render={({ field }) => (
            <DatePicker
              label={"Start Time"}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <FormField
          control={form.control}
          name={"endAt"}
          render={({ field }) => (
            <DatePicker
              label={"End Time"}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

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
          <Button type="submit" className="w-full" disabled={disabled}>
            Create Task
          </Button>
        </div>
        <DialogClose asChild>
          <Button ref={closeButton} className="sr-only">
            Close
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
