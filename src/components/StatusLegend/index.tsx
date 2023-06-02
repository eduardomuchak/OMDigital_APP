import { CheckCircle, WarningCircle } from 'phosphor-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface Status {
  id: number;
  name: string;
  color: string;
}
interface StatusLegendProps {
  status: Status[];
}

export function StatusLegend({ status }: StatusLegendProps) {
  const handleStatus = (item: Status) => {
    switch (item.color) {
      case 'Concluída':
        return <CheckCircle color="#046700" weight="bold" size={14} />;
      case 'Cancelada':
        return <WarningCircle color="#B50202" weight="bold" size={14} />;
      default:
        return <View className={`h-2 w-2 rounded-full ${item.color}`} />;
    }
  };

  return (
    <View className="flex flex-row flex-wrap items-center justify-center space-x-5 px-5 pb-2">
      {status.map((item) => (
        <View className="flex flex-row items-center space-x-2" key={item.id}>
          {handleStatus(item)}
          <Text className="font-poppinsRegular text-sm text-neutral-900">
            {item.name}
          </Text>
        </View>
      ))}
    </View>
  );
}
