import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {
  Camera as CameraIcon,
  CameraRotate,
  Check,
  Image,
} from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { DeleteAllAttachmentsModal } from '../../components/DeleteAllAttachmentsModal';
import { Loading } from '../../components/Loading';
import { PicturesPreview } from '../../components/PicturesPreview';
import { CustomButton } from '../../components/ui/CustomButton';
import { useNewRequestCameraAttachments } from '../../contexts/newRequestCameraAttachments';

export function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [cameraRef, setCameraRef] = useState<null | Camera>(null);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(false);
  const { attachments, setAttachments } = useNewRequestCameraAttachments();
  const { goBack } = useNavigation();

  const verifyPermissions = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    } catch (error) {
      Alert.alert(
        'Erro ao obter permissão',
        'Ocorreu um erro ao obter permissão para acessar a câmera do dispositivo.',
        [{ text: 'Ok' }],
      );
    }
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Erro ao obter permissão',
          'Ocorreu um erro ao obter permissão para acessar as imagens do dispositivo.',
          [{ text: 'Ok' }],
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (!result.canceled) {
        setAttachments((prevImages) => [...prevImages, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while accessing the camera roll.',
        [{ text: 'OK' }],
      );
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const picture = await cameraRef.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      setAttachments((prevImages) => [...prevImages, picture.uri]);
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera((prev) => !prev);
  };

  useEffect(() => {
    verifyPermissions();
  }, []);

  if (hasPermission === null) {
    return <Loading />;
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 w-full items-center justify-center px-5 bg-neutral-100">
        <Text className="font-poppinsBold text-lg mb-10">
          Opa! Parece que você não concedeu a permissão para o acesso à câmera
          do dispositivo.
        </Text>
        <CustomButton onPress={verifyPermissions} variant="primary">
          Permitir acesso à câmera
        </CustomButton>
      </View>
    );
  }

  return (
    <View className="flex-1 w-full">
      <Camera
        className="flex-1 w-full items-center justify-end px-4 py-8 pt-16"
        ref={(ref) => setCameraRef(ref)}
        ratio="16:9"
        type={isFrontCamera ? ('front' as any) : ('back' as any)}
      >
        {attachments.length > 0 ? (
          <>
            <Animated.View
              className="mx-4 flex-row justify-between w-full items-center mb-4"
              entering={FadeInDown}
              exiting={FadeOutDown}
            >
              <DeleteAllAttachmentsModal />
              <TouchableOpacity
                className="bg-alert-green w-12 h-12 rounded-full p-3 mx-auto items-center justify-center"
                onPress={() => goBack()}
                activeOpacity={0.7}
              >
                <Check size={28} color="#FFF" weight="bold" />
              </TouchableOpacity>
            </Animated.View>
            <PicturesPreview capturedImages={attachments} />
          </>
        ) : null}

        <View className="flex flex-row justify-between w-full items-center">
          <TouchableOpacity
            className="bg-white w-12 h-12 rounded-full p-3 mx-auto items-center justify-center"
            onPress={pickImage}
            activeOpacity={0.7}
          >
            <Image color="#1D2F99" size={28} weight="regular" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white w-16 h-16 rounded-full p-3 mx-auto items-center justify-center"
            onPress={takePicture}
            activeOpacity={0.7}
          >
            <CameraIcon color="#1D2F99" size={36} weight="regular" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white w-12 h-12 rounded-full p-3 mx-auto items-center justify-center"
            onPress={toggleCamera}
          >
            <CameraRotate color="#1D2F99" size={28} weight="regular" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
