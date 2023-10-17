import { Text, View } from 'react-native';
import { ListMaintenanceOrder } from '../../../../services/GET/Maintenance/listMaintenanceOrderById/interface';
import { DeleteSymptomModal } from '../SymptomsCard/DeleteSymptomModal';
import { EditSymptomModal } from '../SymptomsCard/EditSymptomModal';

interface SymptomCardProps {
  symptom: ListMaintenanceOrder.Symptoms;
  onEditSymptom: (editedSymptom: { id: number; descricao: string }) => void;
  onDeleteSymptom: (symptom: ListMaintenanceOrder.Symptoms) => void;
}

export function SymptomCard({
  symptom,
  onEditSymptom,
  onDeleteSymptom,
}: SymptomCardProps) {
  return (
    <View className="flex-1 flex-row items-center">
      <DeleteSymptomModal symptom={symptom} onDeleteSymptom={onDeleteSymptom} />
      <View className="flex-1 rounded-xl bg-neutral-100 p-4">
        <Text className="font-poppinsMedium text-lg">
          {symptom.description}
        </Text>
      </View>
      <EditSymptomModal symptom={symptom} onEditSymptom={onEditSymptom} />
    </View>
  );
}
