import { Text, TextInput, View } from 'react-native';
import { QRCodeScannerModal } from '../QRCodeScannerModal';

interface QRCodeScannerInputProps {
  assetCode: string;
  setAssetCode: React.Dispatch<React.SetStateAction<string>>;
}

export function QRCodeScannerInput({
  assetCode,
  setAssetCode,
}: QRCodeScannerInputProps) {
  return (
    <View className="mb-5 flex-row items-end justify-between space-x-2">
      <View className="flex-1">
        <Text className="mb-4 font-poppinsBold text-base">Código do Bem:</Text>
        <TextInput
          placeholder="Digite"
          className="m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2 font-poppinsSemibold"
          value={assetCode}
          onChangeText={(text) => setAssetCode(text)}
        />
      </View>
      <QRCodeScannerModal onScan={setAssetCode} />
    </View>
  );
}
