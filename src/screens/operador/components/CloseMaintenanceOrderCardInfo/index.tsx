import { Text, View } from "react-native";
import { CloseMaintenanceOrderCardInfoProps } from "./interface";

export function CloseMaintenanceOrderCardInfo({
  maintenanceOrder,
}: CloseMaintenanceOrderCardInfoProps) {
  return (
    <View className="mb-5 bg-neutral-100 px-6 py-5">
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">
          Encerramento de Solicitação:
        </Text>
        <Text className="font-poppinsMedium text-base">
          OM12345 - O S034567
        </Text>
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Par. Real:</Text>
        <Text className="font-poppinsMedium text-base">06/01/2023 - 08h57</Text>
      </View>
      <View className="flex">
        <Text className="font-poppinsBold text-lg">Placa:</Text>
        <Text className="font-poppinsMedium text-base">GKY-7G22</Text>
      </View>
    </View>
  );
}
