import { useNavigation } from '@react-navigation/core';
import { X } from 'phosphor-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNewRequestCameraAttachments } from '../../contexts/newRequestCameraAttachments';
import { CustomButton } from '../ui/CustomButton';
import { CustomModal } from '../ui/Modal';

export function DeleteAllAttachmentsModal() {
  const { goBack } = useNavigation();
  const { setAttachments } = useNewRequestCameraAttachments();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        className="bg-alert-red w-12 h-12 rounded-full p-3 mx-auto items-center justify-center"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <X size={28} color="#FFF" weight="bold" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Você deseja excluir todas as fotos?
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
                goBack();
                setIsModalVisible(false);
                setTimeout(() => {
                  setAttachments([]);
                }, 1000);
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
