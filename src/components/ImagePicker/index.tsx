import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';
import { Camera as CameraIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { EditAttachmentModal } from '../EditAttachmentModal';
import { RemoveAttachmentModal } from '../RemoveAttachmentModal';

interface ImagePickerProps {
  onTakeImage: Function;
}

export function ImagePicker({ onTakeImage }: ImagePickerProps) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.',
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: false,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (image && image.assets) {
      setPickedImage(image.assets[0].uri);
      onTakeImage(image.assets[0]);
    }
  }

  const removeImage = () => {
    setPickedImage(null);
  };

  return (
    <View>
      {!pickedImage ? (
        <TouchableOpacity
          activeOpacity={0.7}
          className="m-0 flex h-32 items-center justify-center rounded-lg bg-neutral-100 font-poppinsSemibold"
          style={{
            borderWidth: 2,
            borderColor: '#E5E7EB',
            borderStyle: 'dashed',
          }}
          onPress={takeImageHandler}
        >
          <CameraIcon size={30} color="#1D2F99" weight="bold" />
        </TouchableOpacity>
      ) : (
        <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
          <View className="relative mb-2 h-96 rounded-xl">
            <Image
              className={'h-full w-full rounded-lg'}
              source={{ uri: pickedImage }}
            />
          </View>
          <View className="absolute bottom-5 left-4">
            <RemoveAttachmentModal removeImage={removeImage} />
          </View>
          <View className="absolute bottom-5 right-4">
            <EditAttachmentModal changeImage={takeImageHandler} />
          </View>
        </Animated.View>
      )}
    </View>
  );
}
