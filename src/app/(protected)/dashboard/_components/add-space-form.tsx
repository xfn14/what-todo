"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { createSpaceAction } from "~/server/actions/actions";
import { addSpaceSchema } from "~/server/actions/schemas";
import { Space } from "~/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { DialogClose } from "~/components/ui/dialog";
import { colorClasses, spaceColor } from "~/server/db/schema";
import { cn } from "~/lib/utils";

export interface AddSpaceFormProps {
  parentlessSpaces: Space[];
}

export function AddSpaceForm({ parentlessSpaces }: AddSpaceFormProps) {
  console.log(parentlessSpaces);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const form = useForm<z.infer<typeof addSpaceSchema>>({
    resolver: zodResolver(addSpaceSchema),
    defaultValues: {
      name: "",
      color: "red",
      parent_space: "",
    },
  });

  async function onSubmit(data: z.infer<typeof addSpaceSchema>) {
    setDisabled(true);
    setResMessage("");

    const values = {
      name: data.name,
      color: data.color,
      parent_space: data.parent_space,
    };

    let res = undefined;

    try {
      form.reset();
      res = await createSpaceAction(values);
    } finally {
      if (res) {
        setResMessage(res[0] ?? "");
        console.log(res);
      } else {
        closeButton.current?.click();
      }
      setDisabled(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter the name" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {spaceColor.map((color) => {
                    const colorClass = colorClasses[color];

                    return (
                      <SelectItem key={color as string} value={color as string}>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(`h-4 w-4 rounded-full`, colorClass)}
                          />
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parent_space"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Space (Optional)</FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {parentlessSpaces.map((space) => (
                    <SelectItem key={space.name} value={space.name}>
                      {space.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {resMessage && <div className="text-sm text-red-500">{resMessage}</div>}

        <Button type="submit" className="w-full" disabled={disabled}>
          Create Space
        </Button>

        <DialogClose asChild>
          <Button ref={closeButton} className="sr-only">
            Cancel
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
