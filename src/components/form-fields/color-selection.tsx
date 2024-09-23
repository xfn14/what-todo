import { Control } from "react-hook-form";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { addSpaceSchema } from "~/server/actions/schemas";
import { colorClasses, spaceColor } from "~/server/db/schema";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface ColorSelectionProps {
  control: Control<z.infer<typeof addSpaceSchema>>;
}

const ColorSelection = ({ control }: ColorSelectionProps) => {
  return (
    <FormField
      control={control}
      name={"color"}
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
  );
};

export default ColorSelection;
