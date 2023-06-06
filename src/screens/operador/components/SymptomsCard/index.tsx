import { useContext, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { OMContext } from '../../../../contexts/om-context';
import { EditSymptomModal } from './EditSymptomModal';

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

function HeaderComponent() {
  return <Text className="mb-3 font-poppinsBold text-lg">Sintomas:</Text>;
}

function Card({ symptom, onEditSymptom }: CardProps) {
  return (
    <View className="flex-1 flex-row items-center">
      <View className="flex-1 rounded-xl bg-neutral-100 p-4">
        <Text className="font-poppinsMedium text-lg">{symptom.descricao}</Text>
      </View>
      <EditSymptomModal symptom={symptom} onEditSymptom={onEditSymptom} />
    </View>
  );
}

function FooterComponent() {
  return (
    <CustomButton variant="primary" style={{ marginTop: 20 }}>
      Editar
    </CustomButton>
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
      ListHeaderComponent={HeaderComponent}
      ListFooterComponent={FooterComponent}
      ItemSeparatorComponent={() => <View className="h-3" />}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
