import { useRoute } from "@react-navigation/native";
import { PencilSimple } from "phosphor-react-native";
import { useContext, useState } from "react";
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
import { OMContext } from "../../../../contexts/om-context";

import { OM } from "../../../../interfaces/om-context.interface";

interface EditSymptomModalProps {
  symptom: string;
}

export function EditSymptomModal({ symptom }: EditSymptomModalProps) {
  const { om, setOm } = useContext(OMContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [symptomDescription, setSymptomDescription] = useState(symptom);

  const route = useRoute();
  const operationId = route.params as { id: number };

  const handleChangeSymptom = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = event.nativeEvent;
    setSymptomDescription(text);
  };

  function handleEditSymptom() {
    const editedOM: OM.MaintenanceOrderInfo[] = om.map((om) => {
      if (om.id === operationId.id) {
        om.sintomas.map((sintoma) => {
          if (sintoma.descricao === symptom) {
            sintoma.descricao = symptomDescription;
          }
        });
      }
      return om;
    });

    setOm(editedOM);
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
