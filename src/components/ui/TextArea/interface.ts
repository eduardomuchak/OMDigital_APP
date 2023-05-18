import { TextInputProps } from "react-native";

export interface TextAreaProps extends TextInputProps {
  label: string;
  required?: boolean;
}
