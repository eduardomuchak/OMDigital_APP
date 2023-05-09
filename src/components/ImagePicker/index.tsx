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
      allowsEditing: true,
      aspect: [9, 16],
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
          className="bg-neutral-100 h-32 rounded-lg m-0 font-poppinsSemibold flex items-center justify-center"
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
          <View className="rounded-xl h-96 mb-2 relative">
            <Image
              className={'w-full h-full rounded-lg'}
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
