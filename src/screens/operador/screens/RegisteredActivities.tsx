import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';

import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';
import { Activity } from '../../manutencao/interfaces/Activity';
import { OMMock } from '../../manutencao/mock';
import { activitiesMock } from '../components/ActivityCard/mock';
import { SwipeableActivityCardList } from '../components/SwipeableActivityCardList';

export function RegisteredActivities() {
  const [activities, setActivities] = useState<Activity.Activity[]>([]);
  const [operationInfo, setOperationInfo] = useState<Activity.OperationInfo[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { id } = route.params as { id?: number };

  function mockFetchActivities(id: number): Promise<Activity.Activity[]> {
    return new Promise((resolve) => {
      const filteredActivity = activitiesMock.filter(
        (activity) => activity.id === id,
      );
      resolve(filteredActivity);
    });
  }

  function MockFetchOperationInfo(
    id: number,
  ): Promise<Activity.OperationInfo[]> {
    return new Promise((resolve) => {
      const filteredOperation = OMMock.filter(
        (operation) => operation.id === id,
      );
      resolve(filteredOperation);
    });
  }

  useEffect(() => {
    async function fetchActivity() {
      setLoading(true);
      const data = await mockFetchActivities(id as number);
      setActivities(data);
      setLoading(false);
    }

    async function fetchOperationInfo() {
      setLoading(true);
      const data = await MockFetchOperationInfo(id as number);
      setOperationInfo(data);
      setLoading(false);
    }

    fetchActivity();
    fetchOperationInfo();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const operationInfoProps = {
    codigoBem: operationInfo[0]?.codigoBem,
    ordemManutencao: operationInfo[0]?.ordemManutencao,
    operacao: operationInfo[0]?.operacao,
    paradaReal: operationInfo[0]?.paradaReal,
    prevFim: operationInfo[0]?.prevFim,
  };

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header title={'Atividades Lançadas'} />
      <OperationInfoCard operationInfo={operationInfoProps} />
      <SwipeableActivityCardList activities={activities} />
    </SafeAreaView>
  );
}
