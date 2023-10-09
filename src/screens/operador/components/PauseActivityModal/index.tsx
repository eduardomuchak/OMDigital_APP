import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pause } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { pauseStage } from '../../../../services/GET/Stages/pauseStage';

interface PauseActivityModalProps {
  omId: number;
  activityId: number;
}

export function PauseActivityModal({
  omId,
  activityId,
}: PauseActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: pauseStage,
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

  function handlePauseActivity() {
    mutation.mutate(activityId);
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
          Você deseja pausar esta etapa?
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
