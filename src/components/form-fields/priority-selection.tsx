import { FormControl, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface PrioritySelectionProps {
  value: "low" | "medium" | "high";
  onChange: (value: "low" | "medium" | "high") => void;
}

const PrioritySelection = ({ value, onChange }: PrioritySelectionProps) => {
  return (
    <FormItem>
      <FormLabel>Priority</FormLabel>

      <Select onValueChange={onChange} value={value}>
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
  );
};

export default PrioritySelection;
