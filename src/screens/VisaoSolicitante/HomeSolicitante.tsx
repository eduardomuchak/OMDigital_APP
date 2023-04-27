import { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { CardContainer } from '../../components/CardContainer';
import { SolicitationMock } from '../../components/SolicitationCard/SolicitationMock';
import { Header } from '../../components/Header';
import { StatusLegend } from '../../components/StatusLegend';
import { SolicitationCard } from '../../components/SolicitationCard';
import { CustomButton } from '../../components/ui/CustomButton';
import { StatusFilter } from '../../components/StatusFilter';
import { StatusFilterModal } from './StatusFilterModal';
import { useNavigation } from '@react-navigation/native';

export interface FilterState {
  todas: boolean;
  aguardandoAnalise: boolean;
  manutencaoNegada: boolean;
  emAtendimento: boolean;
  concluido: boolean;
  [key: string]: boolean;
}

export function HomeSolicitante() {
  const { navigate } = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allStatus, setAllStatus] = useState({
    todas: true,
    aguardandoAnalise: false,
    manutencaoNegada: false,
    emAtendimento: false,
    concluido: false,
  });

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  const filteredSolicitations = SolicitationMock.filter((item) => {
    if (allStatus.todas) {
      return SolicitationMock;
    } else {
      return (
        (allStatus.aguardandoAnalise && item.status === 'Aguardando Análise') ||
        (allStatus.manutencaoNegada && item.status === 'Manutenção Negada') ||
        (allStatus.emAtendimento && item.status === 'Em Atendimento') ||
        (allStatus.concluido && item.status === 'Concluído')
      );
    }
  });

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header isHomeScreen title={'Olá, João Motorista'} />
      {isModalVisible && (
        <StatusFilterModal
          onClose={handleCloseModal}
          onConfirm={handleCloseModal}
          isOpen={isModalVisible}
          allStatus={allStatus}
          changeStatus={setAllStatus}
        />
      )}
      <StatusFilter openFilterModal={handleOpenModal} />
      <StatusLegend />
      <CardContainer>
        {filteredSolicitations.map((item) => (
          <SolicitationCard key={item.id} {...item} />
        ))}
        <CustomButton onPress={() => navigate('RegisterNewRequest')} variant="primary">
          Relatar Problema
        </CustomButton>
      </CardContainer>
    </SafeAreaView>
  );
}
