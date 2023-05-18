import { Text, TextInput, View } from "react-native";
import { TextAreaProps } from "./interface";

export function TextArea({ label, required, ...rest }: TextAreaProps) {
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
      <TextInput
        placeholder="Digite"
        multiline={true}
        textAlignVertical="top"
        numberOfLines={6}
        className="m-0 rounded-lg bg-neutral-100 px-5 py-4 font-poppinsSemibold"
        {...rest}
      />
    </>
  );
}
