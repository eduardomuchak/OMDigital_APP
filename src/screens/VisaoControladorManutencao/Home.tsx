import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CardContainer } from '../../components/CardContainer';
import { OMCard } from '../../components/OMCard';
import { OMMock } from '../../components/OMCard/OMMock';
import { Header } from '../../components/Header';
import { FooterModal } from '../../components/FooterModal';
import { StatusFilter } from '../../components/StatusFilter';
import { FilterModalLogistica } from '../VisaoControladorLogistica/components/FilterModalLogistica';

import { Logistica } from '../VisaoControladorLogistica/interfaces';
import { OperationsStatus } from '../../components/OperationsStatus';

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
  const { navigate } = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const filteredOperations = OMMock.filter((item) => {
    const matchStatus =
      status.todas ||
      (item.status === 'Aberta' && status.abertas) ||
      (item.status === 'Aguardando' && status.aguardando) ||
      (item.status === 'Concluída' && status.concluidas) ||
      (item.status === 'Cancelada' && status.canceladas);
    const matchOperacao = operations.every(
      (operation) => operation.showAll || operation[item.operacao]
    );

    return matchStatus && matchOperacao;
  });

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header isHomeScreen title={'Olá, Controlador de Logística'} />
      {isModalVisible && (
        <FilterModalLogistica
          onClose={handleCloseModal}
          onConfirm={handleFilterOptionsConfirmation}
          isOpen={isModalVisible}
          allStatus={status}
        />
      )}
      <StatusFilter openFilterModal={handleOpenModal} filterTitle="Operação - TODAS" />
      <OperationsStatus />
      <CardContainer>
        {filteredOperations.map((item) => (
          <OMCard
            isFinishOrCancel={
              item.status === 'Cancelada' || item.status === 'Concluída' ? true : false
            }
            key={item.id}
            onPress={() => navigate('RegisteredActivities', { id: item.id })}
            {...item}
          />
        ))}
      </CardContainer>
      <FooterModal />
    </SafeAreaView>
  );
}
