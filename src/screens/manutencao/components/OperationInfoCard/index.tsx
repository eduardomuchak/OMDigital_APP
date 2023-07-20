import { Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { PencilSimple } from "phosphor-react-native";
import { GPSLocationModal } from "../../../../components/GPSLocationModal";
import { formatISOStringToPTBRDateString } from "../../../../utils/formatISOStringToPTBRDateString";
import { SymptomListModal } from "../../../operador/components/SymptomsCard/SymptomListModal";
import { Symptom } from "../../../../services/POST/Symptoms/symptom.interface";

interface OperationInfoCardProps {
  operationInfo: {
    codigoBem: string;
    ordemManutencao: string;
    operacao: number;
    paradaReal: string;
    prevFim: string;
    latitude: string;
    longitude: string;
    contador: number;
    tipo: string;
  };
  operador?: boolean;
  operationId?: number;
  symptoms?: Symptom.SymptomList[];
}

export function OperationInfoCard({
  operationInfo,
  operador,
  operationId,
  symptoms,
}: OperationInfoCardProps) {
  const location = {
    latitude: operationInfo.latitude,
    longitude: operationInfo.longitude,
  };

  const navigation = useNavigation();

  return (
    <View className="bg-neutral-100 px-6 py-5">
      <View className="mb-2 flex flex-row justify-between">
        <View>
          <Text className="font-poppinsBold text-lg">Placa:</Text>
          <Text className="font-poppinsMedium text-base ">
            {operationInfo.codigoBem}
          </Text>
        </View>
        {!operador ? (
          <GPSLocationModal location={location} />
        ) : (
          <View className="flex-row">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditMaintenanceOrder", { id: operationId })
              }
              className="mr-2"
              activeOpacity={0.7}
            >
              <PencilSimple size={24} weight="bold" />
            </TouchableOpacity>
            <GPSLocationModal location={location} />
          </View>
        )}
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Ordem de Manutenção:</Text>
        <Text className="font-poppinsMedium text-base">
          {operationInfo.ordemManutencao}
        </Text>
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Tipo da OM:</Text>
        <Text className="font-poppinsMedium text-base">
          {operationInfo.tipo.charAt(0).toUpperCase() +
            operationInfo.tipo.slice(1)}
        </Text>
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Contador (km/hor):</Text>
        <Text className="font-poppinsMedium text-base">
          {operationInfo.contador}
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
      {operador && symptoms!.length > 0 ? (
        <SymptomListModal symptoms={symptoms!} />
      ) : null}
    </View>
  );
}
