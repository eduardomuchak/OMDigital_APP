import { Text, View } from 'react-native';
import { useState } from 'react';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';

export function WarningModal({ children }: { children: JSX.Element }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <CustomButton variant="ghost" onPress={() => setIsModalVisible(true)} activeOpacity={0.7}>
        {children}
      </CustomButton>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsRegular text-base">
          Esta Ordem de Manutenção (OM) foi aberta por outro usuário. Apontar as suas atividades na
          mesma OM?
        </Text>
        <View className="flex flex-row justify-between mt-16">
          <View className="w-[48%]">
            <CustomButton variant="ghost" onPress={() => setIsModalVisible(false)}>
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton variant="cancel" onPress={() => {}}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
