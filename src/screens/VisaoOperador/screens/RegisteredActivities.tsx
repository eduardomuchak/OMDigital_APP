import { SafeAreaView } from 'react-native';
import { Header } from '../../../components/Header';
import { OrderInfoCard } from '../../../components/OrderInfoCard';
import { SwipeableActivityCardList } from '../components/SwipeableActivityCardList';

export function RegisteredActivities() {
  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header title={'Atividades Lançadas'} />
      <OrderInfoCard />
      <SwipeableActivityCardList />
    </SafeAreaView>
  );
}
