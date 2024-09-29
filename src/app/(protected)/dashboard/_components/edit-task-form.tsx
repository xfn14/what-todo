"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker from "~/components/form-fields/date-picker";
import HourPicker from "~/components/form-fields/hour-picker";
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
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { deleteTaskAction, updateTaskAction } from "~/server/actions/actions";
import { updateTaskSchema, validWeekDays } from "~/server/actions/schemas";
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
      recurrent: task.recurrency === "" ? false : true,
      weekDays:
        task.recurrency === ""
          ? []
          : task.recurrency
              .split(",")
              .filter((day): day is (typeof validWeekDays)[number] =>
                (validWeekDays as readonly string[]).includes(day),
              ),
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
        weekDays: data.weekDays,
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

        <FormField
          control={form.control}
          name={"priority"}
          render={({ field }) => (
            <PrioritySelection onChange={field.onChange} value={field.value} />
          )}
        />

        <FormField
          control={form.control}
          name="recurrent"
          render={({ field: recurrentField }) => (
            <>
              <FormItem className="flex flex-row items-center gap-2 space-y-0 rounded-md py-2 pl-1 shadow">
                <FormControl>
                  <Checkbox
                    checked={recurrentField.value}
                    onCheckedChange={recurrentField.onChange}
                  />
                </FormControl>
                <FormLabel>Recurrent</FormLabel>
              </FormItem>

              {recurrentField.value && (
                <FormField
                  control={form.control}
                  name="weekDays"
                  render={({ field: weekDaysField }) => (
                    <FormItem>
                      <FormLabel>Days of the Week</FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="multiple"
                          value={weekDaysField.value ?? []}
                          onValueChange={weekDaysField.onChange}
                          className="grid grid-cols-7 gap-2"
                        >
                          {validWeekDays.map((day) => (
                            <ToggleGroupItem key={day} value={day}>
                              {day.charAt(0).toUpperCase() +
                                day.substring(1, 3)}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name={"startAt"}
                render={({ field: startAtField }) =>
                  recurrentField.value ? (
                    <HourPicker
                      label={"Start Time"}
                      onChange={startAtField.onChange}
                      value={startAtField.value}
                    />
                  ) : (
                    <DatePicker
                      label={"Start Time"}
                      onChange={startAtField.onChange}
                      value={startAtField.value}
                    />
                  )
                }
              />

              <FormField
                control={form.control}
                name={"endAt"}
                render={({ field: endAtField }) =>
                  recurrentField.value ? (
                    <HourPicker
                      label={"End Time"}
                      onChange={endAtField.onChange}
                      value={endAtField.value}
                    />
                  ) : (
                    <DatePicker
                      label={"End Time"}
                      onChange={endAtField.onChange}
                      value={endAtField.value}
                    />
                  )
                }
              />
            </>
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
