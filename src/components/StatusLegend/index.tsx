import React from 'react';
import { Text, View } from 'react-native';

export function StatusLegend() {
  return (
    <React.Fragment>
      <View className="flex flex-row justify-center gap-6 w-full">
        <View className="flex flex-row items-center">
          <View className="w-2 h-2 bg-status-blue rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Em atendimento</Text>
        </View>
        <View className="flex flex-row items-center">
          <View className="w-2 h-2 bg-status-yellow rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">
            Aguardando Análise
          </Text>
        </View>
      </View>
      <View className="flex-row justify-center gap-6 px-20">
        <View className="flex flex-row items-center m-auto">
          <View className="w-2 h-2 bg-status-green  rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">Concluído</Text>
        </View>
        <View className="flex flex-row items-center m-auto">
          <View className="w-2 h-2 bg-status-red rounded-full" />
          <Text className="text-sm font-poppinsRegular text-neutral-900 ml-2">
            Manutenção Negada
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
}
