import { CheckCircle, WarningCircle } from "phosphor-react-native";
import { Text } from "react-native";
import { View } from "react-native";

export function OperationsStatus() {
  return (
    <View className="flex flex-col items-center justify-center px-6 pb-2">
      <View className="mb-1 flex flex-row flex-wrap items-center justify-center px-6">
        <View className="mr-4 flex flex-row items-center">
          <View className="h-2 w-2 rounded-full bg-status-green" />
          <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
            Aberta
          </Text>
        </View>
        <View className="mr-4 flex flex-row items-center">
          <View className="h-2 w-2 rounded-full bg-status-yellow" />
          <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
            Aguardando
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <View className="h-2 w-2 rounded-full bg-status-red" />
          <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
            Atrasada
          </Text>
        </View>
      </View>
      <View className="flex flex-row flex-wrap items-center justify-center px-6">
        <View className="mr-4 flex flex-row items-center">
          <CheckCircle color="#046700" weight="bold" size={14} />
          <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
            Concluída
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <WarningCircle color="#B50202" weight="bold" size={14} />
          <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
            Cancelada
          </Text>
        </View>
      </View>
    </View>
  );
}
