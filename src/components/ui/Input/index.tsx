import { Text, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  label?: string;
}

export function Input({ label, ...rest }: Props) {
  return (
    <>
      <Text className="font-poppinsBold text-sm leading-4 text-neutral-900">{label}</Text>
      <TextInput
        className="bg-neutral-100 px-5 py-2 rounded-lg h-14 m-0 font-poppinsSemibold"
        {...rest}
      />
    </>
  );
}
