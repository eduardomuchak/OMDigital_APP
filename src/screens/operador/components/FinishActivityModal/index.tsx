import { Square, Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { useAuth } from '../../../../contexts/auth';
import useCheckInternetConnection from '../../../../hooks/useCheckInternetConnection';
import useEndStage from '../../hooks/stages/useEndStage.hook';

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
  const { employee } = useAuth();
  if (!employee?.man_power_id) return <></>;

  const { isConnected } = useCheckInternetConnection();
  const { addActivityToEndQueue, endStageMutation } = useEndStage();

  function handleFinishActivity() {
    if (isConnected) {
      endStageMutation.mutate({
        manPowerId: employee?.man_power_id,
        stageId: activityId,
      });
      setIsModalVisible(false);
    } else {
      addActivityToEndQueue({
        manPowerId: employee?.man_power_id,
        activityId,
      });
      Alert.alert(
        'Sucesso',
        'A atividade foi adicionada à fila de sincronização e será finalizada assim que o dispositivo estiver conectado à internet',
      );
      setIsModalVisible(false);
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
