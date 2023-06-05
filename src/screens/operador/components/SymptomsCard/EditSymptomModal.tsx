import { PencilSimple } from "phosphor-react-native";
import { useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomModal } from "../../../../components/ui/Modal";
import { TextArea } from "../../../../components/ui/TextArea";

interface EditSymptomModalProps {
  symptom: {
    id: number;
    descricao: string;
  };
  onEditSymptom: (editedSymptom: { id: number; descricao: string }) => void;
}

export function EditSymptomModal({
  symptom,
  onEditSymptom,
}: EditSymptomModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [symptomDescription, setSymptomDescription] = useState(
    symptom.descricao
  );

  const handleChangeSymptom = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = event.nativeEvent;
    setSymptomDescription(text);
  };

  function handleEditSymptom() {
    onEditSymptom({ id: symptom.id, descricao: symptomDescription });
    setIsModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        className="h-full justify-center rounded-br-lg rounded-tr-lg bg-primary-500 p-2"
        onPress={() => setIsModalVisible(true)}
      >
        <PencilSimple size={30} weight="regular" color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="mb-4 text-center font-poppinsBold text-lg">
          Editar Sintoma
        </Text>

        <TextArea
          label="Sintoma"
          value={symptomDescription}
          onChange={handleChangeSymptom}
        />

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
            <CustomButton variant="primary" onPress={() => handleEditSymptom()}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
