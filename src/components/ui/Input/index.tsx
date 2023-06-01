import { Text, TextInput, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import { InputProps } from './interface';

export function Input({
  label,
  required,
  maskedInput = false,
  maskType = 'custom',
  maskOptions,
  ...rest
}: InputProps) {
  return (
    <>
      <View className="flex flex-row gap-1">
        {required ? (
          <Text className="font-poppinsBold text-sm leading-4 text-status-red">
            *
          </Text>
        ) : null}
        <Text className="font-poppinsBold text-sm leading-4 text-neutral-900">
          {label.toLocaleUpperCase()}
        </Text>
      </View>
      {maskedInput ? (
        <TextInputMask
          type={maskType}
          options={maskOptions}
          className="m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2 font-poppinsSemibold"
          {...rest}
        />
      ) : (
        <TextInput
          className="m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2 font-poppinsSemibold"
          placeholder="Digite"
          {...rest}
        />
      )}
    </>
  );
}
