import { Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { ListMaintenanceOrder } from '../../../../services/GET/Maintenance/listMaintenanceOrderById/interface';

interface DeleteSymptomModalProps {
  symptom: ListMaintenanceOrder.Symptoms;
  onDeleteSymptom: (symptom: ListMaintenanceOrder.Symptoms) => void;
}

export function DeleteSymptomModal({
  symptom,
  onDeleteSymptom,
}: DeleteSymptomModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function onSubmit() {
    onDeleteSymptom(symptom);
    setIsModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        className="h-full justify-center rounded-bl-lg rounded-tl-lg bg-status-red p-2"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Trash size={24} weight="bold" color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="mb-4 text-center font-poppinsBold text-lg">
          Você tem certeza que deseja excluir esse sintoma?
        </Text>

        <View className="flex flex-row justify-between">
          <View className="w-[48%]">
            <CustomButton
              variant="cancel"
              onPress={() => setIsModalVisible(false)}
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton variant="primary" onPress={() => onSubmit()}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
