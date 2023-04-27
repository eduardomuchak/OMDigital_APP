import { Camera } from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

export interface Props {
  label: string;
  required?: boolean;
}

export function OpenCamera({ label, required }: Props) {
  return (
    <>
      <View className="flex flex-row gap-1">
        {required ? (
          <Text className="font-poppinsBold text-sm leading-4 text-status-red">*</Text>
        ) : null}
        <Text className="font-poppinsBold text-sm leading-4 text-neutral-900">
          {label.toLocaleUpperCase()}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-neutral-100 h-32 rounded-lg m-0 font-poppinsSemibold flex items-center justify-center"
        style={{
          borderWidth: 2,
          borderColor: '#E5E7EB',
          borderStyle: 'dashed',
        }}
      >
        <Camera size={30} color="#1D2F99" weight="bold" />
      </TouchableOpacity>
    </>
  );
}
