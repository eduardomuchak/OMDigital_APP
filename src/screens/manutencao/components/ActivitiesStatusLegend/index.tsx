import { CheckCircle, WarningCircle } from 'phosphor-react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

export function ActivitiesStatusLegend() {
  return (
    <View className="flex flex-col px-6 items-center justify-center pb-2">
      <View className="flex flex-row flex-wrap px-4 items-center justify-center mb-1 gap-3">
        <View className="flex flex-row items-center">
          <View className="w-2 h-2 bg-status-green rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Concluída</Text>
        </View>
        <View className="flex flex-row items-center">
          <View className="w-2 h-2 bg-status-yellow rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Em andamento</Text>
        </View>
        <View className="flex flex-row items-center">
          <View className="w-2 h-2 bg-status-red rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Atrasada</Text>
        </View>
      </View>
      <View className="flex flex-row flex-wrap px-6 items-center justify-center">
        <View className="flex flex-row items-center mr-4">
          <View className="w-2 h-2 bg-status-blue rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Não iniciada</Text>
        </View>
      </View>
    </View>
  );
}
