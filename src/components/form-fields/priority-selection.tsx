import { Control } from "react-hook-form";
import { z } from "zod";
import { addTaskSchema } from "~/server/actions/schemas";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface PrioritySelectionProps {
  control: Control<z.infer<typeof addTaskSchema>>;
}

const PrioritySelection = ({ control }: PrioritySelectionProps) => {
  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Priority</FormLabel>

          <Select onValueChange={field.onChange} value={field.value}>
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
  );
};

export default PrioritySelection;
