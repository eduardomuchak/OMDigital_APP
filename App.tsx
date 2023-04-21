import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

import { Loading } from './src/components/Loading';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { StatusBar } from 'react-native';
import { RegisterNewActivity } from './src/screens/RegisterNewActivity';
import { OM } from './src/screens/OM';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent={true} />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RegisterNewActivity" component={RegisterNewActivity} />
        <Stack.Screen name="OM" component={OM} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
