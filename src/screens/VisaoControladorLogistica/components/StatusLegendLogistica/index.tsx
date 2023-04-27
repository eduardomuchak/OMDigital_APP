import { Text, View } from 'react-native';

export function StatusLegendLogistica() {
  return (
    <View className="flex-row justify-center gap-6 px-20">
      <View className="flex flex-row items-center m-auto">
        <View className="w-2 h-2 bg-status-green rounded-full" />
        <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Aberta</Text>
      </View>
      <View className="flex flex-row items-center m-auto">
        <View className="w-2 h-2 bg-status-yellow rounded-full m-auto" />
        <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Aguardando</Text>
      </View>
      <View className="flex flex-row items-center m-auto">
        <View className="w-2 h-2 bg-status-red rounded-full" />
        <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Atrasada</Text>
      </View>
    </View>
  );
}
