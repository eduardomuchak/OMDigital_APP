import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { CardContainer } from '../../../components/CardContainer';
import { FooterModal } from '../../../components/FooterModal';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { OMCard } from '../../../components/OMCard';
import { StatusLegend } from '../../../components/StatusLegend';
import { useAuth } from '../../../contexts/auth';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import { listOperationEmployee } from '../../../services/GET/Operations/fetchOperationByID';
import { fetchMainOrderStatus } from '../../../services/GET/Status/fetchMaintenanceOrdersStatus';
import { textCapitalizer } from '../../../utils/textCapitalize';
import { LogisticaFilterModal } from '../components/LogisticaFilterModal';

export function Home() {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;

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
      <Header isHomeScreen title={`Olá, ${textCapitalizer(employee?.name)}`} />
      <View className="flex flex-row items-center justify-between px-5 py-4">
        <View />
        <Text className="text-neutral text-center font-poppinsBold text-lg">
          Ordens de Manutenção
        </Text>
        <LogisticaFilterModal
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
            <OMCard maintenanceOrder={item} key={item.id} />
          ))}
      </CardContainer>
      <FooterModal />
    </View>
  );
}
