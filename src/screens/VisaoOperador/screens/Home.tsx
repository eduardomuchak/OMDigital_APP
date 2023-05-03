import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { OMMock } from '../../../components/OMCard/OMMock';
import { OperationsStatus } from '../../../components/OperationsStatus';
import { useAuth } from '../../../contexts/auth';
import { AddNewMaintenanceOrderButton } from '../components/AddNewMaintenanceOrderButton';
import { FilterModal } from '../components/FilterModal';
import { OMMockProps } from '../components/FilterModal/interface';
import { SwipeableOMCardList } from '../components/SwipeableOMCardList';

export function Home() {
  const [filteredOrders, setFilteredOrders] = useState<OMMockProps[]>(OMMock);
  const [startPeriod, setStartPeriod] = useState(new Date());
  const [endPeriod, setEndPeriod] = useState(new Date());
  const { navigate } = useNavigation();
  const { user } = useAuth();

  const [allStatus, setAllStatus] = useState([
    {
      isChecked: true,
      label: 'Todas',
      value: 'status-todas',
    },
    {
      isChecked: true,
      label: 'Abertas',
      value: 'status-abertas',
    },
    {
      isChecked: true,
      label: 'Aguardando',
      value: 'status-aguardando',
    },
    {
      isChecked: true,
      label: 'Canceladas',
      value: 'status-canceladas',
    },
    {
      isChecked: true,
      label: 'Concluidas',
      value: 'status-concluidas',
    },
  ]);

  const [allOperations, setAllOperations] = useState([
    {
      isChecked: true,
      label: 'Todas',
      value: 'todas',
    },
    {
      isChecked: true,
      label: 'Operação 1',
      value: 'operacao1',
    },
    {
      isChecked: true,
      label: 'Operação 2',
      value: 'operacao2',
    },
    {
      isChecked: true,
      label: 'Operação 3',
      value: 'operacao3',
    },
  ]);

  // console.log('filteredOrders', filteredOrders);

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header isHomeScreen title={`Olá, ${user?.user}`} />
      <View className="px-6 py-5 flex-row justify-between items-center">
        <View className="flex-1 items-center justify-center">
          <Text className="font-poppinsBold text-lg">Operação - TODAS</Text>
        </View>
        <FilterModal
          status={{ allStatus, setAllStatus }}
          operations={{ allOperations, setAllOperations }}
          period={{ startPeriod, setStartPeriod, endPeriod, setEndPeriod }}
          filtered={{ filteredOrders, setFilteredOrders }}
        />
      </View>
      <OperationsStatus />

      <SwipeableOMCardList maintenanceOrders={filteredOrders} />

      <AddNewMaintenanceOrderButton />
    </SafeAreaView>
  );
}
