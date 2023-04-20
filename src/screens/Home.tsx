import { Text, SafeAreaView } from 'react-native';
import { LogoutModal } from '../components/LogoutModal';

export function Home() {
  return (
    <SafeAreaView className="flex flex-col flex-1 items-center justify-center bg-primary-500">
      <Text>Home page</Text>

      <LogoutModal />
    </SafeAreaView>
  );
}
