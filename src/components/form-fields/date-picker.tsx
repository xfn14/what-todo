import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { TimePicker } from "../time-picker";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface DatePickerProps {
  label: string;
  value: any;
  onChange: (...event: any[]) => void;
}

const DatePicker = ({ label, value, onChange }: DatePickerProps) => {
  return (
    <FormItem className="flex flex-col">
      <FormLabel className="text-left">{label}</FormLabel>
      <Popover>
        <FormControl>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !value && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP HH:mm:ss") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
        </FormControl>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
          <div className="border-t border-border p-3">
            <TimePicker setDate={onChange} date={value} />
          </div>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
};

export default DatePicker;
