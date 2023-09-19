import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { CardContainer } from '../../../components/CardContainer';
import { FooterModal } from '../../../components/FooterModal';

import { useQuery } from '@tanstack/react-query';
import { Loading } from '../../../components/Loading';
import { OMCard } from '../../../components/OMCard';
import { StatusLegend } from '../../../components/StatusLegend';
import { fetchOMFromAPI } from '../../../services/GET/OMs/fetchAllOms/fetchOM';
import { fetchOperationsFromAPI } from '../../../services/GET/Operations/fetchOperations';
import { fetchMainOrderStatus } from '../../../services/GET/Status/fetchMaintenanceOrdersStatus';
import { ManutencaoFilterModal } from '../components/ManutencaoFilterModal';

export function Home() {
  const { navigate } = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);
  const [selectedOperations, setSelectedOperations] = useState<number[]>([]);

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: fetchOMFromAPI,
  });

  const listOperation = useQuery({
    queryKey: ['listOperation'],
    queryFn: fetchOperationsFromAPI,
  });

  const listMainOrderStatus = useQuery({
    queryKey: ['listMainOrderStatus'],
    queryFn: fetchMainOrderStatus,
  });

  if (
    listMaintenanceOrder.isLoading ||
    listOperation.isLoading ||
    listMainOrderStatus.isLoading
  ) {
    return <Loading />;
  }

  if (
    listMaintenanceOrder.data === undefined ||
    listOperation.data === undefined ||
    listMainOrderStatus.data === undefined
  ) {
    return <></>;
  }

  return (
    <View className="flex flex-1 flex-col bg-white">
      <View className="flex flex-row items-center justify-between px-5 py-4">
        <View />
        <Text className="text-neutral text-center font-poppinsBold text-lg">
          Ordens de Manutenção
        </Text>
        <ManutencaoFilterModal
          status={{
            selectedStatus,
            setSelectedStatus,
          }}
          operations={{
            selectedOperations,
            setSelectedOperations,
          }}
        />
      </View>
      <StatusLegend status={listMainOrderStatus.data} />

      <CardContainer>
        {listMaintenanceOrder.data
          .filter((item) => {
            if (selectedStatus.length > 0) {
              return selectedStatus.includes(item.status);
            }
            return true;
          })
          .filter((item) => {
            if (selectedOperations.length > 0) {
              return selectedOperations.includes(item.asset_operation_code);
            }
            return true;
          })
          .map((item) => (
            <OMCard
              maintenanceOrder={item}
              key={item.id}
              onPress={() => {
                console.log('CLICOU');
                console.log('item.id', item.id);
                navigate('RegisteredActivities', { id: item.id });
              }}
            />
          ))}
      </CardContainer>
      <FooterModal />
    </View>
  );
}
