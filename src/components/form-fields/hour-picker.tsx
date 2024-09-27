import { TimePicker } from "../time-picker";
import { FormControl, FormItem, FormLabel } from "../ui/form";

export interface HourPickerProps {
  label: string;
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

const HourPicker = ({ label, value, onChange }: HourPickerProps) => {
  return (
    <FormItem className="flex flex-col">
      <FormLabel className="text-left">{label}</FormLabel>
      <FormControl>
        <TimePicker setDate={onChange} date={value} />
      </FormControl>
    </FormItem>
  );
};

export default HourPicker;
