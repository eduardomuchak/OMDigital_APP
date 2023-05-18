import { Trash } from "phosphor-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../ui/CustomButton";
import { CustomModal } from "../ui/Modal";

export function RemoveAttachmentModal({
  removeImage,
}: {
  removeImage: () => void;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        className="mx-auto h-12 w-12 items-center justify-center rounded-full bg-status-red p-3"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Trash size={28} color="#FFF" weight="bold" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você deseja remover o anexo?
        </Text>
        <View className="mt-16 flex flex-row justify-between">
          <View className="w-[48%]">
            <CustomButton
              variant="ghost"
              onPress={() => setIsModalVisible(false)}
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton
              variant="cancel"
              onPress={() => {
                setIsModalVisible(false);
                removeImage();
              }}
            >
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
