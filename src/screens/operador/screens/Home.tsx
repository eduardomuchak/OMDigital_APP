import { Text, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { StatusLegend } from '../../../components/StatusLegend';
import { useAuth } from '../../../contexts/auth';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import { fetchOperationsFromAPI } from '../../../services/GET/Operations/fetchOperations';
import { fetchMainOrderStatus } from '../../../services/GET/Status/fetchMaintenanceOrdersStatus';
import { AddNewMaintenanceOrderButton } from '../components/AddNewMaintenanceOrderButton';
import { OperadorFilterModal } from '../components/OperadorFilterModal';
import { SwipeableOMCardList } from '../components/SwipeableOMCardList';

export function Home() {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;

  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);
  const [selectedOperations, setSelectedOperations] = useState<number[]>([]);
  const [assetCode, setAssetCode] = useState('');
  const [selectedServiceOrderType, setSelectedServiceOrderType] = useState('');
  const [serviceOrderTypeOptions, setServiceOrderTypeOptions] = useState([
    'Todas',
    'Preventiva',
    'Corretiva',
  ]);
  const [startPeriod, setStartPeriod] = useState(new Date());
  const [endPeriod, setEndPeriod] = useState(new Date());

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: () => listMaintenanceOrderById(employee.id),
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

  console.log('listMaintenanceOrder.data', listMaintenanceOrder.data);

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header isHomeScreen title={`Olá, ${employee?.name}`} />
      <View className="flex flex-row items-center justify-between px-5 py-4">
        <View />
        <Text className="text-neutral text-center font-poppinsBold text-lg">
          Ordens de Manutenção
        </Text>
        <OperadorFilterModal
          status={{
            selectedStatus,
            setSelectedStatus,
          }}
          operations={{
            selectedOperations,
            setSelectedOperations,
          }}
          assetCode={{
            assetCode,
            setAssetCode,
          }}
          serviceOrderType={{
            selectedServiceOrderType,
            setSelectedServiceOrderType,
            serviceOrderTypeOptions,
          }}
          period={{
            startPeriod,
            setStartPeriod,
            endPeriod,
            setEndPeriod,
          }}
        />
      </View>
      <StatusLegend status={listMainOrderStatus.data} />
      {listMaintenanceOrder.data.length === 0 ? (
        <View className="flex flex-1 items-center justify-center">
          <Text className="text-neutral text-center font-poppinsBold text-lg">
            Nenhuma ordem de manutenção encontrada
          </Text>
        </View>
      ) : (
        <SwipeableOMCardList
          maintenanceOrders={listMaintenanceOrder.data
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
            .filter((item) => {
              if (assetCode.length > 0) {
                return item.asset_code.includes(assetCode);
              }
              return true;
            })
            .filter((item) => {
              if (selectedServiceOrderType.length > 0) {
                if (selectedServiceOrderType === 'Todas') {
                  return true;
                }
                if (item.service_type === 'C') {
                  return selectedServiceOrderType === 'Corretiva';
                }
                if (item.service_type === 'P') {
                  return selectedServiceOrderType === 'Preventiva';
                }
              }
              return true;
            })
            .filter((item) => {
              if (startPeriod !== undefined && endPeriod !== undefined) {
                const startDate = new Date(startPeriod);
                const endDate = new Date(endPeriod);
                const omStartDate = new Date(
                  item.start_prev_date + 'T' + item.start_prev_hr + '.000Z',
                );
                const omEndDate = new Date(
                  item.end_prev_date + 'T' + item.end_prev_hr + '.000Z',
                );
                return (
                  omStartDate >= startDate &&
                  omStartDate <= endDate &&
                  omEndDate >= startDate &&
                  omEndDate <= endDate
                );
              }
              return true;
            })}
        />
      )}
      <AddNewMaintenanceOrderButton />
    </View>
  );
}
