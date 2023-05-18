type Mode = "date" | "time" | "datetime";

export interface CustomDateTimePickerProps {
  label: string;
  value: Date;
  onDateSelect: (date: Date) => void;
  required?: boolean;
  mode: Mode;
}
