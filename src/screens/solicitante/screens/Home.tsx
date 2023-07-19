import { useState } from 'react';
import { View } from 'react-native';

import { CardContainer } from '../../../components/CardContainer';
import { Header } from '../../../components/Header';
import { SolicitationCard } from '../../../components/SolicitationCard';
import { StatusFilter } from '../../../components/StatusFilter';
import { StatusLegend } from '../../../components/StatusLegend';
import { useAuth } from '../../../contexts/auth';
import { SolicitationMock } from '../../../mocks/solicitacoes';
import { AddNewRequestButton } from '../components/AddNewRequestButton';
import { StatusFilterModal } from '../components/StatusFilterModal';

export interface FilterState {
  todas: boolean;
  aguardandoAnalise: boolean;
  manutencaoNegada: boolean;
  emAtendimento: boolean;
  concluido: boolean;
  [key: string]: boolean;
}

export function Home() {
  const statusLegendInfo = [
    {
      id: 1,
      name: 'Em atendimento',
      color: 'bg-status-blue',
    },
    {
      id: 2,
      name: 'Aguardando Análise',
      color: 'bg-status-yellow',
    },
    {
      id: 3,
      name: 'Concluído',
      color: 'bg-status-green',
    },
    {
      id: 4,
      name: 'Manutenção Negada',
      color: 'bg-status-red',
    },
  ];

  const { employee } = useAuth();
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
    <View className="flex flex-1 flex-col bg-white">
      <Header isHomeScreen title={`Olá, ${employee?.name}`} />

      {isModalVisible && (
        <StatusFilterModal
          onClose={handleCloseModal}
          onConfirm={handleCloseModal}
          isOpen={isModalVisible}
          allStatus={allStatus}
          changeStatus={setAllStatus}
        />
      )}
      <StatusFilter
        openFilterModal={handleOpenModal}
        filterTitle="Status - TODAS"
      />
      <StatusLegend status={statusLegendInfo} />
      <CardContainer>
        {filteredSolicitations.map((item) => (
          <SolicitationCard key={item.id} {...item} />
        ))}
      </CardContainer>
      <AddNewRequestButton />
    </View>
  );
}
