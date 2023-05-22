import { Text, View } from 'react-native';

import { GPSLocationModal } from '../../../../components/GPSLocationModal';
import { formatISOStringToPTBRDateString } from '../../../../utils/formatISOStringToPTBRDateString';

interface OperationInfoCardProps {
  operationInfo: {
    codigoBem: string;
    ordemManutencao: string;
    operacao: string;
    paradaReal: string;
    prevFim: string;
    latitude: string;
    longitude: string;
  };
}

export function OperationInfoCard({ operationInfo }: OperationInfoCardProps) {
  const location = {
    latitude: operationInfo.latitude,
    longitude: operationInfo.longitude,
  };

  return (
    <View className="bg-neutral-100 px-6 py-5">
      <View className="mb-2 flex flex-row justify-between">
        <View>
          <Text className="font-poppinsBold text-lg">Placa:</Text>
          <Text className="font-poppinsMedium text-base ">
            {operationInfo.codigoBem}
          </Text>
        </View>
        <GPSLocationModal location={location} />
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Ordem de Manutenção:</Text>
        <Text className="font-poppinsMedium text-base">
          {operationInfo.ordemManutencao}
        </Text>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text className="font-poppinsBold text-lg">Par. Real:</Text>
          <Text className="font-poppinsMedium text-base">
            {formatISOStringToPTBRDateString(operationInfo.paradaReal)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="font-poppinsBold text-lg">Prev. Fim:</Text>
          <Text className="font-poppinsMedium text-base">
            {formatISOStringToPTBRDateString(operationInfo.prevFim)}
          </Text>
        </View>
      </View>
    </View>
  );
}
