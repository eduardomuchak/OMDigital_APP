import { Text, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CardContainer } from '../../../components/CardContainer';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { SolicitationCard } from '../../../components/SolicitationCard';
import { StatusLegend } from '../../../components/StatusLegend';
import { useAuth } from '../../../contexts/auth';
import { listUserRequestById } from '../../../services/GET/Solicitations/listUserRequest';
import { fetchSolicitationsStatus } from '../../../services/GET/Status/fetchSolicitationsStatus';
import { AddNewRequestButton } from '../components/AddNewRequestButton';
import { SolicitanteFilterModal } from '../components/SolicitanteFilterModal';

export function Home() {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;

  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);

  const listRequestStatus = useQuery({
    queryKey: ['listRequestStatus'],
    queryFn: fetchSolicitationsStatus,
  });

  const listRequest = useQuery({
    queryKey: ['listRequest'],
    queryFn: () => listUserRequestById(employee.id),
  });

  if (listRequestStatus.isLoading || listRequest.isLoading) {
    return <Loading />;
  }

  if (listRequestStatus.data === undefined || listRequest.data === undefined) {
    return <></>;
  }

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header isHomeScreen title={`Olá, ${employee?.name}`} />
      <View className="flex flex-row items-center justify-between px-5 py-4">
        <View />
        <Text className="text-neutral text-center font-poppinsBold text-lg">
          Solicitações
        </Text>
        <SolicitanteFilterModal
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </View>
      <StatusLegend status={listRequestStatus.data} />
      {listRequest.data.length > 0 ? (
        <CardContainer>
          {listRequest.data
            .filter((item) => {
              if (selectedStatus.length > 0) {
                return selectedStatus.includes(item.status);
              }
              return true;
            })
            .map((item) => (
              <SolicitationCard key={item.id} {...item} />
            ))}
        </CardContainer>
      ) : (
        <View className="flex flex-1 flex-row items-center justify-center">
          <Text className="text-neutral font-poppinsBold text-lg">
            Nenhuma solicitação encontrada
          </Text>
        </View>
      )}
      <AddNewRequestButton />
    </View>
  );
}
