import { Text } from 'react-native';
import { View } from 'react-native';

export function ActivitiesStatus() {
  return (
    <View className="flex flex-row flex-wrap items-center justify-center py-3">
      <View className="flex flex-row items-center mr-4">
        <View className="w-2 h-2 bg-status-green rounded-full" />
        <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Concluída</Text>
      </View>
      <View className="flex flex-row items-center mr-4">
        <View className="w-2 h-2 bg-status-yellow rounded-full" />
        <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Em andamento</Text>
      </View>
      <View className="flex flex-row items-center">
        <View className="w-2 h-2 bg-status-red rounded-full" />
        <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Atrasada</Text>
      </View>
      <View className="flex flex-row items-center">
        <View className="w-2 h-2 bg-status-blue rounded-full" />
        <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Não iniciada</Text>
      </View>
    </View>
  );
}
