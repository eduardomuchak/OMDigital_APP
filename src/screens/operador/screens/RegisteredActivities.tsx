import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { SyncLoading } from '../../../components/SyncLoading';
import { useAuth } from '../../../contexts/auth';
import useCheckInternetConnection from '../../../hooks/useCheckInternetConnection';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import RedirectToSyncScreen from '../components/RedirectToSyncScreen';
import { SwipeableActivityCardList } from '../components/SwipeableActivityCardList';

export function RegisteredActivities() {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const { employee } = useAuth();
  if (!employee?.id) return <></>;
  const { isConnected } = useCheckInternetConnection();

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: () => listMaintenanceOrderById(employee.id),
  });

  if (
    listMaintenanceOrder.isLoading ||
    listMaintenanceOrder.data === undefined
  ) {
    return <Loading />;
  }

  return (
    <>
      {listMaintenanceOrder.isRefetching ||
        (listMaintenanceOrder.isFetching && <SyncLoading />)}
      <View className="flex flex-1 flex-col bg-white">
        <Header title={'Etapas Lançadas'} />
        <SwipeableActivityCardList
          activities={
            listMaintenanceOrder.data.filter((om) => om.id === id)[0].stages
          }
          omId={id}
        />
        {isConnected && <RedirectToSyncScreen />}
      </View>
    </>
  );
}
