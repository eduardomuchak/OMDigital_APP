import { ScrollView, Text, View } from 'react-native';
import { ListMaintenanceOrder } from '../../../../services/GET/Maintenance/listMaintenanceOrderById/interface';

interface CardProps {
  symptom: ListMaintenanceOrder.Symptoms;
}

function Card({ symptom }: CardProps) {
  return (
    <View className="flex-1 flex-row items-center pb-1">
      <View className="flex-1 flex-row space-x-2 rounded-xl">
        <View className="top-2 h-2 w-2 rounded-full bg-black" />
        <Text className="font-poppinsMedium text-lg">
          {symptom.description}
        </Text>
      </View>
    </View>
  );
}

interface StaticSymptomListProps {
  symptoms: ListMaintenanceOrder.Symptoms[];
}

export function StaticSymptomList({ symptoms }: StaticSymptomListProps) {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      {symptoms.map((symptom) => (
        <Card symptom={symptom} key={symptom.id} />
      ))}
    </ScrollView>
  );
}
