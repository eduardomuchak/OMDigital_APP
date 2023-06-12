import { useRoute } from "@react-navigation/native";
import { Trash } from "phosphor-react-native";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomModal } from "../../../../components/ui/Modal";
import { OMContext } from "../../../../contexts/om-context";

interface DeleteActivityModalProps {
  activityId: number;
}

export function DeleteActivityModal({ activityId }: DeleteActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { deleteActivity } = useContext(OMContext);

  // id da OM
  const route = useRoute();
  const { id: omId } = route.params as { id: number };

  function handleDeleteActivity() {
    deleteActivity(activityId, omId);
    setIsModalVisible(false);
  }

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
            <CustomButton variant="primary" onPress={handleDeleteActivity}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
