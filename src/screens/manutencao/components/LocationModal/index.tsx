import { Text, View } from "react-native";

import { CustomModal } from "../../../../components/ui/Modal";
import { CustomButton } from "../../../../components/ui/CustomButton";

interface LocationModalProps {
  isModalVisible: boolean;
  onClose: () => void;
  latitude: string;
  longitude: string;
}

export function LocationModal({
  isModalVisible,
  onClose,
  latitude,
  longitude,
}: LocationModalProps) {
  return (
    <CustomModal isOpen={isModalVisible} onClose={onClose}>
      <Text className="font-poppinsBold text-base">
        Você deseja visualizar a localização no mapa?
      </Text>
      <View className="mb-5 mt-4">
        <View>
          <Text className="font-poppinsBold text-base">Latitude:</Text>
          <Text className="font-poppinsMedium text-base">{latitude}</Text>
        </View>
        <View>
          <Text className="font-poppinsBold text-base">Longitude:</Text>
          <Text className="font-poppinsMedium text-base">{longitude}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <View className="w-[48%]">
          <CustomButton variant="cancel" onPress={onClose}>
            Cancelar
          </CustomButton>
        </View>
        <View className="w-[48%]">
          <CustomButton variant="primary" onPress={onClose}>
            Confirmar
          </CustomButton>
        </View>
      </View>
    </CustomModal>
  );
}
