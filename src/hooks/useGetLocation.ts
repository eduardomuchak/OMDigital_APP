import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useGetLocation() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation &&
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (
      locationPermissionInformation &&
      locationPermissionInformation.status === PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function pickLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  useEffect(() => {
    pickLocationHandler();
  }, [locationPermissionInformation]);

  return { location };
}
