import { Pause } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { useAuth } from '../../../../contexts/auth';
import useCheckInternetConnection from '../../../../hooks/useCheckInternetConnection';
import usePauseStage from '../../hooks/stages/usePauseStage.hook';

interface PauseActivityModalProps {
  omId: number;
  activityId: number;
  maintenanceOrderStatus: number;
}

export function PauseActivityModal({
  omId,
  activityId,
  maintenanceOrderStatus,
}: PauseActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { employee } = useAuth();
  if (!employee?.man_power_id) return <></>;
  const { isConnected } = useCheckInternetConnection();
  const { addActivityToPauseQueue, pauseStageMutation } = usePauseStage();

  function handlePauseActivity() {
    if (maintenanceOrderStatus === 1 || maintenanceOrderStatus === 3) {
      Alert.alert(
        'Erro',
        'Não é possível pausar uma atividade de uma OM que está em andamento ou finalizada',
      );
    } else {
      if (isConnected) {
        setIsModalVisible(false);
        pauseStageMutation.mutate({
          manPowerId: employee?.man_power_id,
          stageId: activityId,
        });
      } else {
        addActivityToPauseQueue({
          manPowerId: employee?.man_power_id,
          activityId,
        });
        Alert.alert(
          'Sucesso',
          'A atividade foi adicionada à fila de sincronização e será pausada assim que o dispositivo estiver conectado à internet',
        );
        setIsModalVisible(false);
      }
    }
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
          </>
        )}
      </CustomModal>
    </>
  );
}
