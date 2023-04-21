import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { AddNewActivityButton } from '../components/AddNewActivityButton';

export function Home() {
  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header isHomeScreen title={'Olá, Alan José'} />
      <AddNewActivityButton />
    </SafeAreaView>
  );
}
