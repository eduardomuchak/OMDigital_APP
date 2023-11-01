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
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import {
  QueryClient,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { BarCodeScanner } from 'expo-barcode-scanner';
import 'expo-dev-client';
import { useCameraPermissions } from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
import Toast from 'react-native-toast-message';
import { Loading } from './src/components/Loading';
import { AuthProvider } from './src/contexts/auth';
import { useGetLocation } from './src/hooks/useGetLocation';
import { storage } from './src/lib/mmkv/storage';
import { clientPersister } from './src/lib/tanstack-sync-storage';
import { toastConfig } from './src/lib/toast/config';
import Routes from './src/routes';

if (__DEV__) {
  initializeMMKVFlipper({ default: storage });
}

if (__DEV__) {
  //@ts-ignore
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export default function App() {
  const { location } = useGetLocation();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  async function SetBackgroundColor() {
    await SystemUI.setBackgroundColorAsync('#1D2F6E');
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

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    SetBackgroundColor();
    BarCodeScanner.requestPermissionsAsync();
  }, []);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <PersistQueryClientProvider
      persistOptions={{ persister: clientPersister }}
      client={queryClient}
    >
      <NavigationContainer>
        <StatusBar style="light" />
        <AuthProvider>
          <Routes />
          <Toast config={toastConfig} position="bottom" />
        </AuthProvider>
      </NavigationContainer>
    </PersistQueryClientProvider>
  );
}
