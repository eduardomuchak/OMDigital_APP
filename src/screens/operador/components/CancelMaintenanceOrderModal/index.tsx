import { Prohibit } from "phosphor-react-native";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomModal } from "../../../../components/ui/Modal";
import { OMContext } from "../../../../contexts/om-context";
import { CancelMaintenanceOrderModalProps } from "./interface";

export function CancelMaintenanceOrderModal({
  isSwipeableTrigger = false,
  omId,
}: CancelMaintenanceOrderModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { cancelOM } = useContext(OMContext);

  function handleCancelOM() {
    cancelOM(omId);
    setIsModalVisible(false);
  }

  return (
    <>
      {/* Modal Trigger */}

      {isSwipeableTrigger ? (
        <View className="items-center gap-1">
          <TouchableOpacity
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-red"
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.7}
          >
            <Prohibit size={30} color="#FFFFFF" weight="bold" />
          </TouchableOpacity>
          <Text className="font-poppinsMedium text-sm">Cancelar</Text>
        </View>
      ) : (
        <CustomButton variant="finish" onPress={() => setIsModalVisible(true)}>
          Finalizar
        </CustomButton>
      )}

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você tem certeza que deseja cancelar esta Ordem de Manutenção?
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
            <CustomButton variant="cancel" onPress={handleCancelOM}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
