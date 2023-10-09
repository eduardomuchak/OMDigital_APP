import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Prohibit } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { deleteMaintenanceOrderAPI } from '../../../../services/DELETE/MaintenanceOrder';
import { CancelMaintenanceOrderModalProps } from './interface';

export function CancelMaintenanceOrderModal({
  isSwipeableTrigger = false,
  omId,
}: CancelMaintenanceOrderModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteMaintenanceOrderAPI,
    onSuccess: (response) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        Alert.alert('Sucesso', response.return[0]);
      } else {
        Alert.alert('Erro', response.return[0]);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  function handleCancelOM() {
    mutation.mutate(omId);
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
