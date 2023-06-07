import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useCameraPermissions } from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect } from 'react';
import { Loading } from './src/components/Loading';
import { AuthProvider } from './src/contexts/auth';
import { useGetLocation } from './src/hooks/useGetLocation';
import Routes from './src/routes';

export default function App() {
  const { location } = useGetLocation();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  async function SetBackgroundColor() {
    await SystemUI.setBackgroundColorAsync('#FFF');
  }
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  useEffect(() => {
    SetBackgroundColor();
    BarCodeScanner.requestPermissionsAsync();
  }, []);

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
