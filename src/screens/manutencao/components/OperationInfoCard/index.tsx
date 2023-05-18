import { Text, View, TouchableOpacity } from "react-native";

import { MapPin } from "phosphor-react-native";

interface OperationInfoCardProps {
  operationInfo: {
    codigoBem: string;
    ordemManutencao: string;
    operacao: string;
    paradaReal: string;
    prevFim: string;
  };
  onLocationShow?: () => void;
}

export function OperationInfoCard({
  operationInfo,
  onLocationShow,
}: OperationInfoCardProps) {
  return (
    <View className="bg-neutral-100 px-6 py-5">
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Placa:</Text>
        <Text className="font-poppinsMedium text-base ">
          {operationInfo.codigoBem}
        </Text>
        {onLocationShow && (
          <TouchableOpacity
            className="absolute right-0 top-1 flex items-center justify-start px-4"
            onPress={onLocationShow}
          >
            <MapPin size={30} weight="bold" color="#000000" />
          </TouchableOpacity>
        )}
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
            {operationInfo.paradaReal}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="font-poppinsBold text-lg">Prev. Fim:</Text>
          <Text className="font-poppinsMedium text-base">
            {operationInfo.prevFim}
          </Text>
        </View>
      </View>
    </View>
  );
}
