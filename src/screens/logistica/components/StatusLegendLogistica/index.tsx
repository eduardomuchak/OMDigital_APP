import { Text, View } from "react-native";

export function StatusLegendLogistica() {
  return (
    <View className="flex-row justify-center gap-6 px-20">
      <View className="m-auto flex flex-row items-center">
        <View className="h-2 w-2 rounded-full bg-status-green" />
        <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
          Aberta
        </Text>
      </View>
      <View className="m-auto flex flex-row items-center">
        <View className="m-auto h-2 w-2 rounded-full bg-status-yellow" />
        <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
          Aguardando
        </Text>
      </View>
      <View className="m-auto flex flex-row items-center">
        <View className="h-2 w-2 rounded-full bg-status-red" />
        <Text className="ml-2 font-poppinsRegular text-sm text-neutral-900">
          Atrasada
        </Text>
      </View>
    </View>
  );
}
