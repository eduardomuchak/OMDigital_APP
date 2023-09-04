import { Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { FilterModal } from '../../../components/FilterModal';
import { Header } from '../../../components/Header';
import { StatusLegend } from '../../../components/StatusLegend';
import { useFilter } from '../../../contexts/OperadorFilter';
import { useAuth } from '../../../contexts/auth';
import { useOperador } from '../../../hooks/useOperador';
import { AddNewMaintenanceOrderButton } from '../components/AddNewMaintenanceOrderButton';
import { SwipeableOMCardList } from '../components/SwipeableOMCardList';

export function Home() {
  const { employee } = useAuth();

  const {
    operadorDataState: { filteredMaintenanceOrders, statusOMs },
  } = useOperador();
  const { handleConfirmFilter } = useFilter();

  useFocusEffect(
    useCallback(() => {
      handleConfirmFilter();
    }, []),
  );

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
      <StatusLegend status={statusOMs} />
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
