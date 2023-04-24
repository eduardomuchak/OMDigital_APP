import { SafeAreaView, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { FooterRegisteredActivities } from '../components/FooterRegisteredActivities';

export function RegisteredActivities() {
  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header title={'Atividades Lançadas'} />
      <View className="flex-1 bg-white" />
      <FooterRegisteredActivities />
    </SafeAreaView>
  );
}
