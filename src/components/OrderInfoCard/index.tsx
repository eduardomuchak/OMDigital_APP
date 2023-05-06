import { Text, View } from 'react-native';

export function OrderInfoCard() {
  return (
    <View className="bg-neutral-100 px-6 py-5">
      <View className="flex mb-2">
        <Text className="font-poppinsBold text-lg">Placa:</Text>
        <Text className="font-poppinsMedium text-base ">GKY-7G22</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-poppinsBold text-lg">Ordem de Manutenção:</Text>
        <Text className="font-poppinsMedium text-base">GKY-7G22</Text>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text className="font-poppinsBold text-lg">Par. Real:</Text>
          <Text className="font-poppinsMedium text-base">06/01/2023 - 08h00</Text>
        </View>
        <View className="flex-1">
          <Text className="font-poppinsBold text-lg">Par. Fim:</Text>
          <Text className="font-poppinsMedium text-base">06/01/2023 - 17h00</Text>
        </View>
      </View>
    </View>
  );
}
