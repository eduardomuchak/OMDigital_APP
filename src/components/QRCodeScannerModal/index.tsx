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

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  if (hasPermission === false) {
    Alert.alert(
      'Permissão de acesso à câmera negada',
      'Para escanear o QR Code, é necessário permitir o acesso à câmera',
      [
        {
          text: 'OK',
          onPress: async () => {
            setHasPermission(null);
          },
        },
      ],
    );
  }

  if (hasPermission === null) {
    return (
      <View className="flex items-center justify-end">
        <TouchableOpacity
          className={'flex h-14 w-14 items-center justify-center rounded-lg'}
          activeOpacity={0.7}
          onPress={async () => {
            getBarCodeScannerPermissions();
          }}
        >
          <Camera size={30} color="#1D2F99" weight="bold" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {/* Modal Trigger */}
      <View className="flex items-center justify-end">
        <TouchableOpacity
          className={'flex h-14 w-14 items-center justify-center rounded-lg'}
          activeOpacity={0.7}
          onPress={() => {
            getBarCodeScannerPermissions();
            setIsModalVisible(true);
          }}
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
          <Text className="mx-6 mt-6 font-poppinsBold text-lg">
            Aponte a câmera para o QR Code
          </Text>
          <View className="h-full">
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              type={BarCodeScanner.Constants.Type.back}
              className="h-[500px]"
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
}
