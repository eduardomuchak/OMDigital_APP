import { SafeAreaView, View } from 'react-native';
import { Header } from '../components/Header';

export function Home() {
  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header isHomeScreen title={'Olá, Alan José'} />
    </SafeAreaView>
  );
}
