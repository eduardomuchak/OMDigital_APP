// React and React Native
import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

//components
import { Header } from '../../components/Header';
import { FooterRegisteredActivities } from '../../components/FooterRegisteredActivities';
import { OperationInfoCard } from './components/OperationInfoCard';
import { ActivitiesStatusLegend } from './components/ActivitiesStatusLegend';
import { ActivityCard } from './components/ActivityCard';
import { CardContainer } from './components/ActivityCard/CardContainer';
import { LocationModal } from './components/LocationModal';

// interfaces
import { Activity } from './components/interfaces/Activity';
import { Loading } from '../../components/Loading';

// mocks
import { OMMock } from '../../components/OMCard/OMMock';

const activitiesMock = [
  {
    id: 1,
    name: 'Troca de óleo',
    startDate: '2021-08-01T00:00:00.000Z',
    endDate: '2021-08-01T00:00:00.000Z',
    status: 'Concluída',
    images: ['image1', 'image2', 'image3'],
  },
  {
    id: 2,
    name: 'Troca da lona de freio',
    startDate: '2021-08-01T00:00:00.000Z',
    endDate: '2021-08-01T00:00:00.000Z',
    status: 'Em andamento',
  },
  {
    id: 3,
    name: 'Verificar o óleo da caixa de marcha',
    startDate: '2021-08-01T00:00:00.000Z',
    endDate: '2021-08-01T00:00:00.000Z',
    status: 'Atrasada',
    // acrescentar array de imagens
  },
];

export function RegisteredActivities() {
  const [activities, setActivities] = useState<Activity.Activity[]>([]);
  const [operationInfo, setOperationInfo] = useState<Activity.OperationInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleOpenLocationModal() {
    setIsModalVisible(true);
  }

  function handleCloseLocationModal() {
    setIsModalVisible(false);
  }

  // get ID from route params
  const route = useRoute();
  const { id } = route.params as { id?: number };

  // uses the id to call the API and get the activities
  function mockFetchActivities(id: number): Promise<Activity.Activity[]> {
    return new Promise((resolve) => {
      const filteredActivity = activitiesMock.filter((activity) => activity.id === id);
      resolve(filteredActivity);
    });
  }

  function MockFetchOperationInfo(id: number): Promise<Activity.OperationInfo[]> {
    return new Promise((resolve) => {
      const filteredOperation = OMMock.filter((operation) => operation.id === id);
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
      <OperationInfoCard
        operationInfo={operationInfoProps}
        onLocationShow={handleOpenLocationModal}
      />
      {isModalVisible && (
        <LocationModal
          onClose={handleCloseLocationModal}
          isModalVisible={isModalVisible}
          latitude="
        -21.264681596194617"
          longitude="
        -44.985687115219225"
        />
      )}
      <Text className="font-poppinsBold text-[18px] px-6 mb-3 mt-4">Atividades:</Text>
      <ActivitiesStatusLegend />
      <CardContainer>
        {activities.map((activity) => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
      </CardContainer>
      <FooterRegisteredActivities />
    </SafeAreaView>
  );
}
