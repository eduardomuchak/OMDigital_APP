import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Square } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { useAuth } from '../../../../contexts/auth';
import { endMaintenanceOrderAPI } from '../../../../services/GET/Maintenance/getEndMaintenanceOrder';
import { listMaintenanceOrderById } from '../../../../services/GET/Maintenance/listMaintenanceOrderById';

interface FinishMaintenanceOrdemModalProps {
  isSwipeableTrigger?: boolean;
  omId: number;
}

export function FinishMaintenanceOrderModal({
  isSwipeableTrigger = false,
  omId,
}: FinishMaintenanceOrdemModalProps) {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: () => listMaintenanceOrderById(employee.id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: endMaintenanceOrderAPI,
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

  function handleFinishMaintenanceOrder() {
    if (listMaintenanceOrder.data === undefined) return;
    const handledOm = listMaintenanceOrder.data.find(
      (om) => om.id === omId,
    )?.stages;
    const isAllActivitiesFinished = handledOm?.every(
      (atividade) => atividade.status === 7,
    );

    if (isAllActivitiesFinished) {
      // mutation.mutate(omId);
      navigation.navigate('CloseMaintenanceOrder', { id: omId });
      setIsModalVisible(false);
    } else {
      setIsModalVisible(false);
      Alert.alert(
        'Atenção',
        'Todas as etapas devem estar concluídas para finalizar uma OM. Verifique as etapas pendentes.',
      );
    }
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
        <CustomButton variant="finish" onPress={() => setIsModalVisible(true)}>
          Finalizar
        </CustomButton>
      )}

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você tem certeza que deseja encerrar a Ordem de Manutenção?
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
            <CustomButton
              variant="primary"
              onPress={handleFinishMaintenanceOrder}
            >
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
