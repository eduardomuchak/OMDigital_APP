import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { Trash } from 'phosphor-react-native';
import { CustomDateTimePicker } from '../../../../components/ui/CustomDateTimePicker';

export function FinishActivityModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        className="flex items-center justify-center w-10 bg-status-green rounded-r-xl"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Trash size={24} weight="bold" color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base mb-8">
          Você tem certeza que deseja finalizar a atividade?
        </Text>
        <CustomDateTimePicker
          value={endDate}
          onDateSelect={setEndDate}
          label="Data e hora de término"
          mode="datetime"
        />
        <View className="flex flex-row justify-between mt-8">
          <View className="w-[48%]">
            <CustomButton variant="cancel" onPress={() => setIsModalVisible(false)}>
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton variant="primary" onPress={() => {}}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
