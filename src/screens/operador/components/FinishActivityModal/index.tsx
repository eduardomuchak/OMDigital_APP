import { Square, Trash } from "phosphor-react-native";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomDateTimePicker } from "../../../../components/ui/CustomDateTimePicker";
import { CustomModal } from "../../../../components/ui/Modal";
import { OMContext } from "../../../../contexts/om-context";

interface FinishActivityModalProps {
  isSwipeableTrigger?: boolean;
  omId: number;
  activityId: number;
}

export function FinishActivityModal({
  isSwipeableTrigger = false,
  omId,
  activityId,
}: FinishActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { finishActivity } = useContext(OMContext);

  function handleFinishActivity() {
    setIsModalVisible(false);
    finishActivity(activityId, omId, endDate.toISOString());
  }

  return (
    <>
      {/* Modal Trigger */}
      {isSwipeableTrigger ? (
        <View className="items-center gap-1">
          <TouchableOpacity
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-green"
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.7}
          >
            <Square size={30} color="#FFFFFF" weight="bold" />
          </TouchableOpacity>
          <Text className="font-poppinsMedium text-sm">Finalizar</Text>
        </View>
      ) : (
        <TouchableOpacity
          className="flex w-10 items-center justify-center rounded-r-xl bg-status-green"
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <Trash size={24} weight="bold" color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="mb-8 font-poppinsRegular text-base">
          Você deseja finalizar a atividade?
        </Text>
        <CustomDateTimePicker
          value={endDate}
          onDateSelect={setEndDate}
          label="Data e hora de término"
          mode="datetime"
        />
        <View className="mt-8 flex flex-row justify-between">
          <View className="w-[48%]">
            <CustomButton
              variant="cancel"
              onPress={() => setIsModalVisible(false)}
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton variant="primary" onPress={handleFinishActivity}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
