import { Square, Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../../components/ui/CustomDateTimePicker';
import { CustomModal } from '../../../../components/ui/Modal';
import { FinishActivityModalProps } from './interface';

export function FinishActivityModal({ isSwipeableTrigger = false }: FinishActivityModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <>
      {/* Modal Trigger */}
      {isSwipeableTrigger ? (
        <View className="gap-1 items-center">
          <TouchableOpacity
            className="bg-status-green rounded-lg w-11 h-11 flex items-center justify-center"
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.7}
          >
            <Square size={30} color="#FFFFFF" weight="bold" />
          </TouchableOpacity>
          <Text className="font-poppinsMedium text-sm">Finalizar</Text>
        </View>
      ) : (
        <TouchableOpacity
          className="flex items-center justify-center w-10 bg-status-green rounded-r-xl"
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <Trash size={24} weight="bold" color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base mb-8">
          Você deseja finalizar a atividade?
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
