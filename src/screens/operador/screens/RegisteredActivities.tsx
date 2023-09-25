import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { fetchOMFromAPI } from '../../../services/GET/OMs/fetchAllOms/fetchOM';
import { SwipeableActivityCardList } from '../components/SwipeableActivityCardList';

export function RegisteredActivities() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: fetchOMFromAPI,
  });

  if (
    listMaintenanceOrder.isLoading ||
    listMaintenanceOrder.data === undefined
  ) {
    return <Loading />;
  }

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title={'Etapas Lançadas'} />
      <SwipeableActivityCardList
        activities={
          listMaintenanceOrder.data.filter((om) => om.id === id)[0].stages
        }
        omId={id}
      />
    </View>
  );
}
