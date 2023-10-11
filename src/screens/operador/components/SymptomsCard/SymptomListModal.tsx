import { DotsThreeVertical } from 'phosphor-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomModal } from '../../../../components/ui/Modal';
import { ListMaintenanceOrder } from '../../../../services/GET/Maintenance/listMaintenanceOrderById/interface';
import { StaticSymptomList } from './StaticSymptomList';

interface EditSymptomModalProps {
  symptoms: ListMaintenanceOrder.Symptoms[];
}

export function SymptomListModal({ symptoms }: EditSymptomModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center justify-center pt-5"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text className="font-poppinsBold text-lg">
          Toque para ver os sintomas
        </Text>
        <DotsThreeVertical size={24} color="#000" weight="bold" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal
        isOpen={isModalVisible}
        onClose={setIsModalVisible}
        showCloseButton
        defaultPadding={false}
      >
        <View className="mx-auto w-screen max-w-xl p-6">
          <Text className="mb-4 text-center font-poppinsBold text-lg">
            Sintomas Cadastrados
          </Text>
          <StaticSymptomList symptoms={symptoms} />
        </View>
      </CustomModal>
    </>
  );
}
