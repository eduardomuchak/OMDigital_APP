import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';

export function DynamicStatusBar() {
  const route = useRoute();
  const isDarkContent = route.name === 'Login';

  return (
    <StatusBar
      barStyle={isDarkContent ? 'dark-content' : 'light-content'}
      backgroundColor={'transparent'}
      translucent={true}
    />
  );
}
