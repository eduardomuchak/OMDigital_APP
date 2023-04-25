import { Text, View } from 'react-native';
import { Funnel } from 'phosphor-react-native';

export function StatusFilter() {
  return (
    <View className="flex-row items-center justify-center mt-4 mb-5 relative">
      <Text className="font-poppinsBold text-lg text-center text-neutral">Status - TODAS</Text>
      <View className="absolute right-8 top-0">
        <Funnel size={26} color="#556AEB" weight="fill" />
      </View>
    </View>
  );
}
