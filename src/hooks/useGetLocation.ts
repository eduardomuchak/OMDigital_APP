import * as Location from 'expo-location';

import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useGetLocation() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  async function getUserLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissões insuficientes!',
        'Você precisa conceder permissão para usar a localização do dispositivo.',
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return { location };
}
