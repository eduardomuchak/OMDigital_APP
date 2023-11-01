import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { PencilSimple } from 'phosphor-react-native';
import { AttachmentPreviewModal } from '../../../../components/AttachmentPreviewModal';
import { GPSLocationModal } from '../../../../components/GPSLocationModal';
import { ListMaintenanceOrder } from '../../../../services/GET/Maintenance/listMaintenanceOrderById/interface';
import { fetchMainOrderStatus } from '../../../../services/GET/Status/fetchMaintenanceOrdersStatus';
import { formatISOStringToPTBRDateString } from '../../../../utils/formatISOStringToPTBRDateString';
import { omIDFormatter } from '../../../../utils/omIDFormatter';

interface OperationInfoCardProps {
  maintenanceOrder: ListMaintenanceOrder.MaintenanceOrder;
  isOperador?: boolean;
}

export function OperationInfoCard({
  maintenanceOrder,
  isOperador,
}: OperationInfoCardProps) {
  const navigation = useNavigation();
  const location = {
    latitude: maintenanceOrder.latitude,
    longitude: maintenanceOrder.longitude,
  };

  const listMainOrderStatus = useQuery({
    queryKey: ['listMainOrderStatus'],
    queryFn: fetchMainOrderStatus,
  });

  if (listMainOrderStatus.data === undefined || listMainOrderStatus.isLoading) {
    return <></>;
  }

  const foundStatus = listMainOrderStatus.data.find(
    (status) => status.id === maintenanceOrder.status,
  );

  if (foundStatus === undefined) return <></>;

  return (
    <View className="bg-neutral-100 px-6 py-5">
      <View className="mb-2 flex flex-row justify-between">
        <View>
          <Text className="font-poppinsBold text-lg">Placa:</Text>
          <Text className="font-poppinsMedium text-base ">
            {maintenanceOrder.asset_code}
          </Text>
        </View>
        {!isOperador ? (
          location.latitude !== null &&
          location.longitude !== null && (
            <GPSLocationModal location={location} />
          )
        ) : (
          <View className="flex-row">
            {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditMaintenanceOrder', {
                  id: maintenanceOrder.id,
                })
              }
              className="mr-2"
              activeOpacity={0.7}
            >
              <PencilSimple size={24} weight="bold" />
            </TouchableOpacity> */}
            {location.latitude !== null && location.longitude !== null && (
              <GPSLocationModal location={location} />
            )}
          </View>
        )}
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Ordem de Manutenção:</Text>
        <Text className="font-poppinsMedium text-base">
          {omIDFormatter(maintenanceOrder.id)}
        </Text>
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Status da OM:</Text>
        <View className="flex flex-row items-center space-x-2">
          <View
            style={{
              backgroundColor: foundStatus.property,
            }}
            className={`h-2 w-2 rounded-full`}
          />
          <Text className="font-poppinsMedium text-base">
            {foundStatus.description}
          </Text>
        </View>
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Tipo da OM:</Text>
        <Text className="font-poppinsMedium text-base">
          {maintenanceOrder.service_type === 'C' ? 'Corretiva' : 'Preventiva'}
        </Text>
      </View>
      <View className="mb-2 flex">
        <Text className="font-poppinsBold text-lg">Contador (km/hor):</Text>
        <Text className="font-poppinsMedium text-base">
          {maintenanceOrder.counter}
        </Text>
      </View>
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text className="font-poppinsBold text-lg">Par. Real:</Text>
          <Text className="font-poppinsMedium text-base">
            {formatISOStringToPTBRDateString(
              maintenanceOrder.start_prev_date +
                'T' +
                maintenanceOrder.start_prev_hr +
                '.000Z',
            )}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="font-poppinsBold text-lg">Prev. Fim:</Text>
          <Text className="font-poppinsMedium text-base">
            {formatISOStringToPTBRDateString(
              maintenanceOrder.end_prev_date +
                'T' +
                maintenanceOrder.end_prev_hr +
                '.000Z',
            )}
          </Text>
        </View>
      </View>
      {isOperador && maintenanceOrder.symptoms.length > 0 && (
        <View className="relative mt-2 flex-1">
          <View className="flex flex-row items-center justify-between">
            <Text className="font-poppinsBold text-lg">Sintomas:</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditMaintenanceOrder', {
                  id: maintenanceOrder.id,
                })
              }
              className="mt-1 rounded-lg bg-nepomuceno-dark-blue p-2"
              activeOpacity={0.7}
            >
              <PencilSimple size={24} weight="bold" color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-col space-y-4">
            {maintenanceOrder.symptoms.map((symptom) => (
              <View
                className="flex flex-row items-start space-x-1"
                key={symptom.id}
              >
                <View
                  style={{
                    backgroundColor: '#000000',
                  }}
                  className="mr-2 mt-2 h-2 w-2 rounded-full"
                />

                <Text className="font-poppinsMedium text-base">
                  {symptom.description}
                </Text>
                {symptom.images && symptom.images.length > 0 && (
                  <View className="ml-3">
                    <AttachmentPreviewModal images={symptom.images} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
      {/* {isOperador && maintenanceOrder.symptoms.length > 0 ? (
        <SymptomListModal symptoms={maintenanceOrder.symptoms} />
      ) : null} */}
    </View>
  );
}
