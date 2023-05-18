import { Text } from "react-native";
import { View } from "react-native";

export function ActivitiesStatus() {
  return (
    <View className="flex flex-row flex-wrap items-center justify-center py-3">
      <View className="mr-4 flex flex-row items-center">
        <View className="h-2 w-2 rounded-full bg-status-green" />
        <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
          Concluída
        </Text>
      </View>
      <View className="mr-4 flex flex-row items-center">
        <View className="h-2 w-2 rounded-full bg-status-yellow" />
        <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
          Em andamento
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <View className="h-2 w-2 rounded-full bg-status-red" />
        <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
          Atrasada
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <View className="h-2 w-2 rounded-full bg-status-blue" />
        <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
          Não iniciada
        </Text>
      </View>
    </View>
  );
}
