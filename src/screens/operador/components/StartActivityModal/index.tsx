import { Play } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { useAuth } from '../../../../contexts/auth';
import useCheckInternetConnection from '../../../../hooks/useCheckInternetConnection';
import useStartStage from '../../hooks/stages/useStartStage.hook';

interface StartActivityModalProps {
  omId: number;
  activityId: number;
  maintenanceOrderStatus: number;
}

export function StartActivityModal({
  omId,
  activityId,
  maintenanceOrderStatus,
}: StartActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { employee } = useAuth();
  if (!employee?.man_power_id) return <></>;
  const { addActivityToStartQueue, startStageMutation } = useStartStage();
  const { isConnected } = useCheckInternetConnection();

  function handleStartActivity() {
    if (isConnected) {
      startStageMutation.mutate({
        manPowerId: employee?.man_power_id,
        stageId: activityId,
      });
      setIsModalVisible(false);
    } else {
      addActivityToStartQueue({
        manPowerId: employee?.man_power_id,
        activityId,
      });
      Alert.alert(
        'Sucesso',
        'A atividade foi adicionada à fila de sincronização e será iniciada assim que o dispositivo estiver conectado à internet',
      );
      setIsModalVisible(false);
    }
  }

  return (
    <>
      {/* Modal Trigger */}
      <View className="items-center gap-1">
        <TouchableOpacity
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-green"
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <View className="pr-1">
            <Play size={30} color="#FFFFFF" weight="bold" />
          </View>
        </TouchableOpacity>
        <Text className="font-poppinsMedium text-sm">Iniciar</Text>
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
              Você deseja iniciar a atividade?
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
                  onPress={() => handleStartActivity()}
                >
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
