import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../../components/Header';
import { OMMock } from '../../../components/OMCard/OMMock';
import { OperationsStatus } from '../../../components/OperationsStatus';
import { useAuth } from '../../../contexts/auth';
import { AddNewMaintenanceOrderButton } from '../components/AddNewMaintenanceOrderButton';
import { OMMockProps } from '../components/FilterModal/interface';
import { SwipeableOMCardList } from '../components/SwipeableOMCardList';
import { FilterModalLogistica } from '../../VisaoControladorLogistica/components/FilterModalLogistica';
import { Logistica } from '../../VisaoControladorLogistica/interfaces';
import { StatusFilter } from '../../../components/StatusFilter';

const operationsMock = [
  {
    id: 1,
    name: 'Operação 1',
  },
  {
    id: 2,
    name: 'Operação 2',
  },
  {
    id: 3,
    name: 'Operação 3',
  },
];

export function Home() {
  const [orders, _setOrders] = useState<OMMockProps[]>(OMMock);
  const [startPeriod, setStartPeriod] = useState(new Date());
  const [endPeriod, setEndPeriod] = useState(new Date());
  const { navigate } = useNavigation();
  const { user } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [status, setStatus] = useState({
    todas: true,
    abertas: false,
    aguardando: false,
    concluidas: false,
    canceladas: false,
  });
  const [operations, setOperations] = useState(
    operationsMock.map((operation) => {
      return {
        showAll: true,
        [operation.name]: false,
      };
    })
  );

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleFilterOptionsConfirmation(
    pickedStatus: Logistica.StatusFilterStateOptions,
    pickedOperations: Logistica.OperationState[]
  ) {
    setStatus(pickedStatus);
    setOperations(pickedOperations);
    setIsModalVisible(false);
  }

  const filteredOperations = orders.filter((item) => {
    const matchStatus =
      status.todas ||
      (item.status === 'Aberta' && status.abertas) ||
      (item.status === 'Aguardando' && status.aguardando) ||
      (item.status === 'Concluída' && status.concluidas) ||
      (item.status === 'Cancelada' && status.canceladas);
    const matchOperacao = operations.every(
      (operation) => operation.showAll || operation[item.operacao]
    );

    // const matchPeriod =
    //   new Date(item.paradaReal) == startPeriod && new Date(item.prevFim) == endPeriod;

    return matchStatus && matchOperacao;
  });

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header isHomeScreen title={`Olá, ${user?.user}`} />
      {isModalVisible && (
        <FilterModalLogistica
          onClose={handleCloseModal}
          onConfirm={handleFilterOptionsConfirmation}
          isOpen={isModalVisible}
          allStatus={status}
          isOperador={true}
          startPeriod={startPeriod}
          endPeriod={endPeriod}
          setStartPeriod={setStartPeriod}
          setEndPeriod={setEndPeriod}
        />
      )}
      <StatusFilter openFilterModal={handleOpenModal} filterTitle="Operação - TODAS" />
      <OperationsStatus />

      <SwipeableOMCardList maintenanceOrders={filteredOperations} />

      <AddNewMaintenanceOrderButton />
    </SafeAreaView>
  );
}
