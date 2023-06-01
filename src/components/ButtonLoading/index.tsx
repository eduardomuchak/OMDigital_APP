import { ActivityIndicator, Text, View } from 'react-native';

export function ButtonLoading({ color }: { color: string }) {
  return (
    <View className="flex-row items-end justify-center">
      <ActivityIndicator color={color} size={24} />
      <Text className="px-4 text-center font-poppinsBold text-base leading-5 text-white">
        Enviando...
      </Text>
    </View>
  );
}
