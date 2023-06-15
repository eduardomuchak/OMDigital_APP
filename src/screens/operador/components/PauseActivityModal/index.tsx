import { Pause } from "phosphor-react-native";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomModal } from "../../../../components/ui/Modal";
import { OMContext } from "../../../../contexts/om-context";

interface PauseActivityModalProps {
  omId: number;
  activityId: number;
}

export function PauseActivityModal({
  omId,
  activityId,
}: PauseActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { pauseOrInitiateActivity } = useContext(OMContext);

  function handlePauseActivity() {
    pauseOrInitiateActivity(activityId, omId, "Pausada");
    setIsModalVisible(false);
  }

  return (
    <>
      {/* Modal Trigger */}
      <View className="items-center gap-1">
        <TouchableOpacity
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-red"
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <Pause size={30} color="#FFFFFF" weight="bold" />
        </TouchableOpacity>
        <Text className="font-poppinsMedium text-sm">Pausar</Text>
      </View>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você deseja pausar a atividade?
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
            <CustomButton variant="primary" onPress={handlePauseActivity}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
