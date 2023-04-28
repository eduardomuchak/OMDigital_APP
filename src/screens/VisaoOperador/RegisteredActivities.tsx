import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { OrderInfoCard } from '../../components/OrderInfoCard';
import { ActivitiesStatus } from '../../components/ActivitiesStatus';
import { ActivityCard } from './components/ActivityCard';
import { CustomButton } from '../../components/ui/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { activitiesMock } from './components/ActivityCard/mock';

export function RegisteredActivities() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header title={'Atividades Lançadas'} />
      <OrderInfoCard />
      <ScrollView className="flex-1 bg-white px-6 py-4" showsVerticalScrollIndicator={false}>
        <Text className="font-poppinsBold text-lg">Atividades:</Text>
        <ActivitiesStatus />
        <View style={{ gap: 8 }}>
          {activitiesMock.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </View>
        <View className="mt-5 mb-3">
          <CustomButton variant="primary" onPress={() => navigate('RegisterNewActivity')}>
            Adicionar Atividade
          </CustomButton>
        </View>
        <View className="mb-10">
          <CustomButton variant="finish" onPress={() => navigate('CloseMaintenanceOrder')}>
            Finalizar OM
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
