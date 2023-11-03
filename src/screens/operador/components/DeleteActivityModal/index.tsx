import { Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import useCheckInternetConnection from '../../../../hooks/useCheckInternetConnection';
import useDeleteStage from '../../hooks/stages/useDeleteStage.hook';

interface DeleteActivityModalProps {
  activityId: number;
}

export function DeleteActivityModal({ activityId }: DeleteActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isConnected } = useCheckInternetConnection();
  const { deleteStageMutation, addActivityToDeleteQueue } = useDeleteStage();

  function handleDeleteActivity() {
    if (isConnected) {
      deleteStageMutation.mutate(activityId);
      setIsModalVisible(false);
    } else {
      addActivityToDeleteQueue(activityId);
      Alert.alert(
        'Sucesso',
        'A atividade foi adicionada à fila de sincronização e será excluída assim que o dispositivo estiver conectado à internet',
      );
      setIsModalVisible(false);
    }
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
