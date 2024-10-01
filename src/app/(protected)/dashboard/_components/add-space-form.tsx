"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ColorSelection from "~/components/form-fields/color-selection";
import { Button } from "~/components/ui/button";
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
import { createSpaceAction } from "~/server/actions/actions";
import { addSpaceSchema } from "~/server/actions/schemas";
import { useSpacesStore } from "~/stores/spaces-store";
import type { Space } from "~/types";

export interface AddSpaceFormProps {
  parentlessSpaces: Space[];
}

export function AddSpaceForm() {
  const parentlessSpaces = useSpacesStore((state) => state.getParentlessSpaces);
  const updateSpace = useSpacesStore((state) => state.updateSpace);

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

    try {
      const [res, err] = await createSpaceAction({
        name: data.name,
        color: data.color,
        parent_space: data.parent_space,
      });

      if (err) {
        setResMessage(err.message);
        return;
      } else if (res) {
        updateSpace(res[0] as Space);
        closeButton.current?.click();
      }
    } catch (error) {
      console.log("Space creation failed");
    } finally {
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

        <ColorSelection control={form.control} />

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
                  {parentlessSpaces().map((space) => (
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
