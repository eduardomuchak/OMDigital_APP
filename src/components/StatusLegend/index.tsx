import React from 'react';
import { Text, View } from 'react-native';

export function StatusLegend() {
  return (
    <View className="flex flex-col px-6 items-center justify-center pb-2">
      <View className="flex flex-row flex-wrap items-center justify-center mb-1">
        <View className="flex flex-row items-center mr-4">
          <View className="w-2 h-2 bg-status-blue rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Em atendimento</Text>
        </View>
        <View className="flex flex-row items-center">
          <View className="w-2 h-2 bg-status-yellow rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">
            Aguardando Análise
          </Text>
        </View>
        <View className="flex flex-row items-center mr-4">
          <View className="w-2 h-2 bg-status-green rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Concluído</Text>
        </View>
        <View className="flex flex-row items-center">
          <View className="w-2 h-2 bg-status-red rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">
            Manutenção Negada
          </Text>
        </View>
      </View>
    </View>
  );
}
