import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Square, Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { useAuth } from '../../../../contexts/auth';
import { endStage } from '../../../../services/GET/Stages/endStage';

interface FinishActivityModalProps {
  isSwipeableTrigger?: boolean;
  omId: number;
  activityId: number;
  maintenanceOrderStatus: number;
}

export function FinishActivityModal({
  isSwipeableTrigger = false,
  omId,
  activityId,
  maintenanceOrderStatus,
}: FinishActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [endDate, setEndDate] = useState<Date>(new Date());
  const queryClient = useQueryClient();
  const { employee } = useAuth();
  if (!employee?.man_power_id) return <></>;

  const mutation = useMutation({
    mutationFn: () => endStage(activityId, employee.man_power_id),
    onSuccess: (response) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        Alert.alert('Sucesso', response.return[0]);
      } else {
        Alert.alert('Erro', response.return.message);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  function handleFinishActivity() {
    mutation.mutate();
    setIsModalVisible(false);
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
        {maintenanceOrderStatus === 1 || maintenanceOrderStatus === 3 ? (
          <>
            <Text className="font-poppinsBold text-base">
              Não é possível alterar o andamento das etapas em uma OM que está
              com o status "Aguardando Atendimento" ou "Parada Futura"
            </Text>
            <View className="mt-16 flex flex-row justify-center">
              <View className="w-[48%]">
                <CustomButton
                  variant="cancel"
                  onPress={() => setIsModalVisible(false)}
                >
                  Fechar
                </CustomButton>
              </View>
            </View>
          </>
        ) : (
          <>
            <Text className="mb-8 font-poppinsRegular text-base">
              Você deseja finalizar esta etapa?
            </Text>
            {/* <CustomDateTimePicker
          value={endDate}
          onDateSelect={setEndDate}
          label="Data e hora de término"
          mode="datetime"
        /> */}
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
          </>
        )}
      </CustomModal>
    </>
  );
}
