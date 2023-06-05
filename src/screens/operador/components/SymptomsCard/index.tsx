import { useContext, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { OMContext } from "../../../../contexts/om-context";
import { EditSymptomModal } from "./EditSymptomModal";

interface SymptomsCardProps {
  symptoms: {
    id: number;
    descricao: string;
  }[];
  operationId: number;
}

interface CardProps {
  symptom: {
    id: number;
    descricao: string;
  };
  onEditSymptom: (editedSymptom: { id: number; descricao: string }) => void;
}

function Card({ symptom, onEditSymptom }: CardProps) {
  return (
    <View className="flex-1 flex-row items-center py-2">
      <View className="flex-1 rounded-xl bg-neutral-100 p-4">
        <Text className="font-poppinsMedium text-lg">{symptom.descricao}</Text>
      </View>
      <EditSymptomModal symptom={symptom} onEditSymptom={onEditSymptom} />
    </View>
  );
}

export function SymptomsCard({ symptoms, operationId }: SymptomsCardProps) {
  const { om, setOm } = useContext(OMContext);
  const [key, setKey] = useState(0);

  const handleEditSymptom = (editedSymptom: {
    id: number;
    descricao: string;
  }) => {
    const editedOm = om.map((om) => {
      if (om.id === operationId) {
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
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <FlatList
      data={symptoms}
      keyExtractor={(item) => `${item.id}-${key}`}
      renderItem={({ item }) => (
        <Card symptom={item} onEditSymptom={handleEditSymptom} />
      )}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
