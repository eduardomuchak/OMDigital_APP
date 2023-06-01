import { useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Header } from "../../../components/Header";
import { CustomButton } from "../../../components/ui/CustomButton";
import { TextArea } from "../../../components/ui/TextArea";
import { OMContext } from "../../../contexts/om-context";
import { OperationInfoCard } from "../../manutencao/components/OperationInfoCard";

export function RegisterNewSymptom() {
  const router = useRoute();
  const { id } = router.params as { id?: number };

  const { om, setOm } = useContext(OMContext);
  const [symptom, setSymptom] = useState("");

  const filteredOM = om.filter((om) => om.id === id);

  const operationInfoProps = {
    codigoBem: filteredOM[0]?.codigoBem,
    ordemManutencao: filteredOM[0]?.ordemManutencao,
    operacao: filteredOM[0]?.operacao,
    paradaReal: filteredOM[0]?.paradaReal,
    prevFim: filteredOM[0]?.prevFim,
    latitude: filteredOM[0]?.latitude,
    longitude: filteredOM[0]?.longitude,
  };

  function handleTextChange(text: string) {
    setSymptom(text);
  }

  function handleAddNewSymptom() {
    const updatedOM = om.map((om) => {
      if (om.id === id) {
        return {
          ...om,
          sintomas: [
            ...om.sintomas,
            {
              id: om.sintomas[om.sintomas.length - 1].id + 1,
              descricao: symptom,
            },
          ],
        };
      }

      return om;
    });

    setOm(updatedOM);
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="Adicionar Novo Sintoma" />
      <OperationInfoCard operationInfo={operationInfoProps} />
      <View className="space-y-10 px-4 py-9">
        <TextArea
          value={symptom}
          label="Sintoma"
          onChangeText={handleTextChange}
        />
        <CustomButton onPress={handleAddNewSymptom} variant="primary">
          Cadastrar
        </CustomButton>
      </View>
    </View>
  );
}
