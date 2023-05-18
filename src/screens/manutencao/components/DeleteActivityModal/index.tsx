import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomModal } from "../../../../components/ui/Modal";
import { Trash } from "phosphor-react-native";

export function DeleteActivityModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        className="flex w-10 items-center justify-center rounded-r-xl bg-status-red"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Trash size={24} weight="bold" color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você tem certeza que deseja excluir a atividade?
        </Text>
        <View className="mt-16 flex flex-row justify-between">
          <View className="w-[48%]">
            <CustomButton
              variant="cancel"
              onPress={() => setIsModalVisible(false)}
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton variant="primary" onPress={() => {}}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
