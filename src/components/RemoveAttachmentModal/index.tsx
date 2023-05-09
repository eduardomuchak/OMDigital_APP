import { Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../ui/CustomButton';
import { CustomModal } from '../ui/Modal';

export function RemoveAttachmentModal({
  removeImage,
}: {
  removeImage: () => void;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        className="bg-status-red w-12 h-12 rounded-full p-3 mx-auto items-center justify-center"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Trash size={28} color="#FFF" weight="bold" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você deseja remover o anexo?
        </Text>
        <View className="flex flex-row justify-between mt-16">
          <View className="w-[48%]">
            <CustomButton
              variant="ghost"
              onPress={() => setIsModalVisible(false)}
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton
              variant="cancel"
              onPress={() => {
                setIsModalVisible(false);
                removeImage();
              }}
            >
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
