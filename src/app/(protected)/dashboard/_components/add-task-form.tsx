"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { TimePickerDemo } from "~/components/time-picker-demo";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { createTask } from "~/server/queries";

export const addTaskSchema = z.object({
  title: z.string(),
  space: z.string(),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  startAt: z.date(),
  endAt: z.date().optional(),
  recurrent: z.boolean().default(false).optional(),
});

export function AddTaskForm() {
  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      priority: "low",
      startAt: new Date(),
      recurrent: false,
    },
  });

  async function onSubmit(data: z.infer<typeof addTaskSchema>) {
    console.log(data);

    // const res = await createTask({
    //   title: data.title,
    //   space: data.space,
    //   description: data.description,
    //   priority: data.priority,
    //   startAt: data.startAt,
    //   endAt: data.endAt,
    //   recurrent: data.recurrent,
    // });
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

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {/* TODO: Add user spaces here */}
                  <SelectItem key={"personal"} value={"personal"}>
                    Personal
                  </SelectItem>
                  <SelectItem key={"work"} value={"work"}>
                    Work
                  </SelectItem>
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
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem key={"low"} value={"low"}>
                    Low
                  </SelectItem>

                  <SelectItem key={"medium"} value={"medium"}>
                    Medium
                  </SelectItem>

                  <SelectItem key={"high"} value={"high"}>
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">Start Time</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="border-t border-border p-3">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">Start Time</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="border-t border-border p-3">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
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

        <Button type="submit" className="w-full">
          Create Task
        </Button>
      </form>
    </Form>
  );
}
