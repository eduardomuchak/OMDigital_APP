import { Text, TextProps } from 'react-native';

interface ErrorTextProps extends TextProps {
  children: string;
}

export function ErrorText({ children }: ErrorTextProps) {
  return <Text className="text-red-500 text-xs font-poppinsRegular">{children}</Text>;
}
