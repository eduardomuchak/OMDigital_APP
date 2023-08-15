import { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';

import { FilterModal } from '../../../components/FilterModal';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { StatusLegend } from '../../../components/StatusLegend';
import { useAuth } from '../../../contexts/auth';
import { useFilter } from '../../../contexts/filter';
import { OMContext } from '../../../contexts/om-context';
import { AddNewMaintenanceOrderButton } from '../components/AddNewMaintenanceOrderButton';
import { SwipeableOMCardList } from '../components/SwipeableOMCardList';

export function Home() {
  const {
    fetchOM,
    handleLegendStageStatus,
    mappedMaintenanceOrder,
    statusLegendInfo,
    handleOperations,
  } = useContext(OMContext);

  const { employee } = useAuth();
  const { filteredMaintenanceOrders, getFilterDataFromAsyncStorage } =
    useFilter();

  useEffect(() => {
    fetchOM();
    handleOperations();
    handleLegendStageStatus();
    getFilterDataFromAsyncStorage();
  }, []);

  if (
    !mappedMaintenanceOrder ||
    mappedMaintenanceOrder.length === 0 ||
    !statusLegendInfo ||
    statusLegendInfo.length === 0
  ) {
    return <Loading />;
  }

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header isHomeScreen title={`Olá, ${employee?.name}`} />
      <View className="flex flex-row items-center justify-between px-5 py-4">
        <View />
        <Text className="text-neutral text-center font-poppinsBold text-lg">
          Ordens de Manutenção
        </Text>
        <FilterModal />
      </View>
      <StatusLegend status={statusLegendInfo} />

      {filteredMaintenanceOrders.length === 0 ? (
        <View className="flex flex-1 items-center justify-center">
          <Text className="text-neutral text-center font-poppinsBold text-lg">
            Nenhuma ordem de manutenção encontrada
          </Text>
        </View>
      ) : (
        <SwipeableOMCardList maintenanceOrders={filteredMaintenanceOrders} />
      )}

      <AddNewMaintenanceOrderButton />
    </View>
  );
}
