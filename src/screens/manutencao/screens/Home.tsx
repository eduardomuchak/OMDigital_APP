import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

import { CardContainer } from '../../../components/CardContainer';
import { FooterModal } from '../../../components/FooterModal';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loading } from '../../../components/Loading';
import { NetworkStatus } from '../../../components/NetworkStatus';
import { OMCard } from '../../../components/OMCard';
import { StatusLegend } from '../../../components/StatusLegend';
import { useAuth } from '../../../contexts/auth';
import useCheckInternetConnection from '../../../hooks/useCheckInternetConnection';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import { listOperationEmployee } from '../../../services/GET/Operations/fetchOperationByID';
import { fetchMainOrderStatus } from '../../../services/GET/Status/fetchMaintenanceOrdersStatus';
import { ManutencaoFilterModal } from '../components/ManutencaoFilterModal';
import RedirectToSyncScreen from '../components/RedirectToSyncScreen';

export function Home() {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;
  const { navigate } = useNavigation();
  const queryClient = useQueryClient();
  const { isConnected } = useCheckInternetConnection();

  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);
  const [selectedOperations, setSelectedOperations] = useState<number[]>([]);

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: () => listMaintenanceOrderById(employee.id),
  });

  const listOperation = useQuery({
    queryKey: ['listOperation'],
    queryFn: () => listOperationEmployee(employee.id),
  });

  const listMainOrderStatus = useQuery({
    queryKey: ['listMainOrderStatus'],
    queryFn: fetchMainOrderStatus,
  });

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
    queryClient.invalidateQueries({ queryKey: ['listOperation'] });
    queryClient.invalidateQueries({ queryKey: ['listMainOrderStatus'] });
  };

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
      {listMaintenanceOrder.data.length > 0 ? (
        <CardContainer
          isRefetching={
            listMaintenanceOrder.isRefetching ||
            listOperation.isRefetching ||
            listMainOrderStatus.isRefetching
          }
        >
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
                  navigate('RegisteredActivities', { id: item.id });
                }}
              />
            ))}
        </CardContainer>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                listMaintenanceOrder.isRefetching ||
                listOperation.isRefetching ||
                listMainOrderStatus.isRefetching
              }
              onRefresh={onRefresh}
            />
          }
        >
          <View className="my-48 flex flex-1 flex-row items-center justify-center">
            <Text className="text-neutral text-center font-poppinsBold text-lg">
              Nenhuma ordem de manutenção encontrada
            </Text>
          </View>
        </ScrollView>
      )}

      {!isConnected && <NetworkStatus />}
      {isConnected && <RedirectToSyncScreen />}
      <FooterModal />
    </View>
  );
}
