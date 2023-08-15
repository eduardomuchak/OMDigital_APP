import { Funnel } from 'phosphor-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFilter } from '../../contexts/filter';
import { CustomButton } from '../ui/CustomButton';
import { CustomModal } from '../ui/Modal';
import { AssetCodeQRCodeScanner } from './AssetCodeQRCodeScanner';
import { DateOptions } from './DateOptions';
import { OperationsOptions } from './OperationsOptions';
import { ServiceOrderType } from './ServiceOrderType';
import { StatusOptions } from './StatusOptions';

export function FilterModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleConfirmFilter } = useFilter();

  const onConfirm = () => {
    handleConfirmFilter();
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Funnel size={26} color="#1D2F99" weight="fill" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <ScrollView
          className="max-h-[650px]"
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-5 font-poppinsBold text-base">
            Selecione as opções de filtro:
          </Text>

          {/* Status */}
          <StatusOptions />

          {/* Asset Code */}
          <AssetCodeQRCodeScanner />

          {/* Operations */}
          <OperationsOptions />

          {/* OS Type */}
          <ServiceOrderType />

          {/* Date Filter */}
          <DateOptions />

          {/* Modal Footer */}
          <View className="mt-6 flex flex-row justify-between">
            <View className="w-[48%]">
              <CustomButton
                variant="cancel"
                onPress={() => setIsModalVisible(false)}
              >
                Cancelar
              </CustomButton>
            </View>
            <View className="w-[48%]">
              <CustomButton variant="primary" onPress={onConfirm}>
                Confirmar
              </CustomButton>
            </View>
          </View>
        </ScrollView>
      </CustomModal>
    </>
  );
}
