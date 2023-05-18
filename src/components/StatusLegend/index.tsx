import React from 'react';
import { Text, View } from 'react-native';

export function StatusLegend() {
  return (
    <View className="flex flex-col items-center justify-center px-6 pb-2">
      <View className="mb-1 flex flex-row flex-wrap items-center justify-center space-x-4">
        <View className="flex flex-row items-center space-x-2">
          <View className="h-2 w-2 rounded-full bg-status-blue" />
          <Text className="font-poppinsRegular text-sm text-neutral-900">
            Em atendimento
          </Text>
        </View>
        <View className="flex flex-row items-center space-x-2">
          <View className="h-2 w-2 rounded-full bg-status-yellow" />
          <Text className="font-poppinsRegular text-sm text-neutral-900">
            Aguardando Análise
          </Text>
        </View>
        <View className="flex flex-row items-center space-x-2">
          <View className="h-2 w-2 rounded-full bg-status-green" />
          <Text className="font-poppinsRegular text-sm text-neutral-900">
            Concluído
          </Text>
        </View>
        <View className="flex flex-row items-center space-x-2">
          <View className="h-2 w-2 rounded-full bg-status-red" />
          <Text className="font-poppinsRegular text-sm text-neutral-900">
            Manutenção Negada
          </Text>
        </View>
      </View>
    </View>
  );
}
