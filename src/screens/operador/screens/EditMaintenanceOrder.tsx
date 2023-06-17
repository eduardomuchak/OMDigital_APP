import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { Header } from "../../../components/Header";
import { CustomButton } from "../../../components/ui/CustomButton";
import { OMContext } from "../../../contexts/om-context";
import { OperationInfoCard } from "../../manutencao/components/OperationInfoCard";
import { SymptomCard } from "../components/SymptomCard";

export function EditMaintenanceOrder() {
  const { om, setOm } = useContext(OMContext);
  const route = useRoute();
  const operationId = route.params as { id: number };

  const filteredOM = om.filter((om) => om.id === operationId.id);
  const operationInfoProps = {
    codigoBem: filteredOM[0]?.codigoBem,
    ordemManutencao: filteredOM[0]?.ordemManutencao,
    operacao: filteredOM[0]?.operacao,
    paradaReal: filteredOM[0]?.paradaReal,
    prevFim: filteredOM[0]?.prevFim,
    latitude: filteredOM[0]?.latitude,
    longitude: filteredOM[0]?.longitude,
  };
  const symptoms = filteredOM[0]?.sintomas;

  const { goBack } = useNavigation();

  const handleEditSymptom = (editedSymptom: {
    id: number;
    descricao: string;
  }) => {
    const editedOm = om.map((om) => {
      if (om.id === operationId.id) {
        const updatedSymptoms = om.sintomas.map((symptom) => {
          if (symptom.id === editedSymptom.id) {
            return {
              ...symptom,
              descricao: editedSymptom.descricao,
            };
          }
          return symptom;
        });

        return { ...om, sintomas: updatedSymptoms };
      }
      return om;
    });
    setOm(editedOm);
  };

  function handleEditOM() {
    goBack();
  }

  return (
    <View className="flex-1 bg-white">
      <Header title={"Editar Ordem de Manutenção"} />
      <OperationInfoCard operationInfo={operationInfoProps} />
      <View className="flex-1 px-6 py-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="mb-3 font-poppinsBold text-lg">Sintomas:</Text>
          {symptoms.map((symptom, index) => (
            <>
              <SymptomCard
                key={symptom.id}
                symptom={symptom}
                onEditSymptom={handleEditSymptom}
              />
              {index !== symptoms.length - 1 ? <View className="h-3" /> : null}
            </>
          ))}
          <CustomButton
            variant="primary"
            style={{ marginTop: 20 }}
            onPress={handleEditOM}
          >
            Editar
          </CustomButton>
        </ScrollView>
      </View>
    </View>
  );
}
