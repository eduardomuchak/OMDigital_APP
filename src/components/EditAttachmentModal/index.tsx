import { PencilSimple } from 'phosphor-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../ui/CustomButton';
import { CustomModal } from '../ui/Modal';

export function EditAttachmentModal({
  changeImage,
}: {
  changeImage: () => void;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        className="bg-primary-500 w-12 h-12 rounded-full p-3 mx-auto items-center justify-center"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <PencilSimple size={28} color="#FFF" weight="bold" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você deseja substituir o anexo?
        </Text>
        <View className="flex flex-row justify-between mt-16">
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
              onPress={() => {
                setIsModalVisible(false);
                changeImage();
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
