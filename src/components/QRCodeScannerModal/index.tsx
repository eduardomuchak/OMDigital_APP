import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Camera } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomModal } from '../ui/Modal';

interface QRCodeScannerModalProps {
  onScan: Function;
}

export function QRCodeScannerModal({ onScan }: QRCodeScannerModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);

  const [permissionResponse, requestPermission] =
    BarCodeScanner.usePermissions();

  async function verifyPermissions() {
    if (permissionResponse?.status === 'granted') {
      const permissionResponse = await requestPermission();
      setHasPermission(permissionResponse.granted);
    }

    if (permissionResponse?.status === 'denied') {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.',
      );
      return false;
    }

    return true;
  }

  const handleBarCodeScanned = ({
    type,
    data,
    bounds,
    cornerPoints,
  }: BarCodeScannerResult) => {
    setScanned(true);
    onScan(data);
    Alert.alert(
      'Código escaneado com sucesso!',
      JSON.stringify({ type, data, bounds, cornerPoints }, null, 2),
      [
        {
          text: 'OK',
          onPress: () => {
            setScanned(false);
            setIsModalVisible(false);
          },
        },
      ],
    );
  };

  if (hasPermission === null || hasPermission === false) {
    verifyPermissions();
    return (
      <View className="flex justify-end items-center">
        <TouchableOpacity
          className={'h-14 w-14 flex items-center justify-center rounded-lg'}
          activeOpacity={0.7}
          onPress={() => setIsModalVisible(true)}
        >
          <Camera size={30} color="#1D2F99" weight="bold" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {/* Modal Trigger */}
      <View className="flex justify-end items-center">
        <TouchableOpacity
          className={'h-14 w-14 flex items-center justify-center rounded-lg'}
          activeOpacity={0.7}
          onPress={() => setIsModalVisible(true)}
        >
          <Camera size={30} color="#1D2F99" weight="bold" />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <CustomModal
        isOpen={isModalVisible}
        onClose={setIsModalVisible}
        defaultPadding={false}
      >
        <View className="h-[560px]">
          <Text className="font-poppinsBold text-lg mt-6 mb-2 mx-auto">
            Aponte a câmera para o QR Code
          </Text>
          <View className="h-full">
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              className="h-[500px]"
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
}
