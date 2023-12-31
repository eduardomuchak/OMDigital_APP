import { CheckCircle, Pause, WarningCircle, X } from 'phosphor-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface Status {
  id: number;
  description: string;
  color?: string;
  property: string;
}
interface StatusLegendProps {
  status: Status[];
}

export function StatusLegend({ status }: StatusLegendProps) {
  const handleStatus = (item: Status) => {
    switch (item.description) {
      case 'Concluída':
        return <CheckCircle color="#046700" weight="bold" size={14} />;
      case 'Finalizada':
        return <CheckCircle color="#046700" weight="bold" size={14} />;
      case 'Cancelada':
        return <WarningCircle color="#B50202" weight="bold" size={14} />;
      case 'Pausada':
        return <Pause color="#B50202" weight="bold" size={14} />;
      case 'Recusada':
        return <X color="#B50202" weight="bold" size={14} />;
      default:
        return (
          <View
            style={{
              backgroundColor: item.property,
            }}
            className={`h-2 w-2 rounded-full`}
          />
        );
    }
  };

  return (
    <View className="flex flex-row flex-wrap items-center justify-center space-x-2 px-3 pb-2">
      {status
        .sort((a, b) =>
          a.description > b.description
            ? 1
            : b.description > a.description
            ? -1
            : 0,
        )
        .map((item) => (
          <View className="flex flex-row items-center space-x-1" key={item.id}>
            {handleStatus(item)}
            <Text className="font-poppinsRegular text-sm text-neutral-900">
              {item.description}
            </Text>
          </View>
        ))}
    </View>
  );
}
