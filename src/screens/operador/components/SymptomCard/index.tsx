import { Text, View } from 'react-native';
import { Symptom } from '../../../../services/POST/Symptoms/symptom.interface';
import { EditSymptomModal } from '../SymptomsCard/EditSymptomModal';

interface SymptomCardProps {
  symptom: Symptom.SymptomList;
  onEditSymptom: (editedSymptom: { id: number; descricao: string }) => void;
}

export function SymptomCard({ symptom, onEditSymptom }: SymptomCardProps) {
  return (
    <View className="flex-1 flex-row items-center">
      <View className="flex-1 rounded-xl bg-neutral-100 p-4">
        <Text className="font-poppinsMedium text-lg">
          {symptom.description}
        </Text>
      </View>
      <EditSymptomModal symptom={symptom} onEditSymptom={onEditSymptom} />
    </View>
  );
}
