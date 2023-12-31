import { useQuery } from '@tanstack/react-query';
import { Square } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { useAuth } from '../../../../contexts/auth';
import useCheckInternetConnection from '../../../../hooks/useCheckInternetConnection';
import { listMaintenanceOrderById } from '../../../../services/GET/Maintenance/listMaintenanceOrderById';
import useFinishMaintenanceOrder from '../../hooks/maintenanceOrders/useFinishMaintenanceOrder.hook';

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

  const { isConnected } = useCheckInternetConnection();
  const { addFinishOMToQueue, finishMaintenanceOrderMutation } =
    useFinishMaintenanceOrder();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: () => listMaintenanceOrderById(employee.id),
  });

  function handleFinishMaintenanceOrder() {
    if (listMaintenanceOrder.data === undefined) return;
    const handledOm = listMaintenanceOrder.data.find(
      (om) => om.id === omId,
    )?.stages;
    const isAllActivitiesFinished = handledOm?.every(
      (atividade) => atividade.status === 4,
    );

    if (isConnected) {
      if (isAllActivitiesFinished) {
        finishMaintenanceOrderMutation.mutate(omId);
        setIsModalVisible(false);
      } else {
        setIsModalVisible(false);
        Alert.alert(
          'Atenção',
          'Todas as etapas devem estar concluídas para finalizar uma OM. Verifique as etapas pendentes.',
        );
      }
    } else {
      if (isAllActivitiesFinished) {
        addFinishOMToQueue(omId);
        setIsModalVisible(false);
        Alert.alert(
          'Sucesso',
          'A ordem de manutenção foi adicionada à fila de sincronização e será finalizada assim que o dispositivo estiver conectado à internet',
        );
      } else {
        setIsModalVisible(false);
        Alert.alert(
          'Atenção',
          'Todas as etapas devem estar concluídas para finalizar uma OM. Verifique as etapas pendentes.',
        );
      }
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
        <View className="mb-10 px-6">
          <CustomButton
            variant="finish"
            onPress={() => setIsModalVisible(true)}
          >
            Finalizar OM
          </CustomButton>
        </View>
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
