import { ChatText } from "phosphor-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CustomModal } from "../../../../components/ui/Modal";

interface EditSymptomModalProps {
  observations: string;
}

export function ObservationsModal({ observations }: EditSymptomModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <ChatText size={24} color="#000" weight="bold" />
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
            Observações
          </Text>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
          >
            <Text className="font-poppinsMedium text-lg">{observations}</Text>
          </ScrollView>
        </View>
      </CustomModal>
    </>
  );
}
