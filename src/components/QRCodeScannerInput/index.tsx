import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { QRCodeScannerModal } from "../QRCodeScannerModal";

interface QRCodeScannerInputProps {
  handleChangeCodigoBem: (codigoBem: string) => void;
}

export function QRCodeScannerInput({
  handleChangeCodigoBem,
}: QRCodeScannerInputProps) {
  const [codigoBem, setCodigoBem] = useState("");

  function onChangeCodigoBem(codigoBem: string) {
    setCodigoBem(codigoBem);
  }

  useEffect(() => {
    handleChangeCodigoBem(codigoBem);
  }, [codigoBem]);

  return (
    <View className="flex-row items-end justify-between space-x-2 py-4">
      <View className="flex-1">
        <Text className="font-poppinsBold">Código do Bem:</Text>
        <TextInput
          placeholder="Digite"
          className="m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2 font-poppinsSemibold"
          value={codigoBem}
          onChangeText={onChangeCodigoBem}
        />
      </View>
      <QRCodeScannerModal onScan={setCodigoBem} />
    </View>
  );
}
