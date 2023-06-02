import { FlatList, ScrollView, Text, View } from "react-native";
import { EditSymptomModal } from "./EditSymptomModal";

interface SymptomsCardProps {
  symptoms: {
    id: number;
    descricao: string;
  }[];
}

interface CardProps {
  item: {
    id: number;
    descricao: string;
  };
  symptom: string;
}

function Card({ item, symptom }: CardProps) {
  return (
    <View className="flex-1 flex-row items-center py-2">
      <View className="flex-1 rounded-xl bg-neutral-100 p-4">
        <Text className="font-poppinsMedium text-lg">{item.descricao}</Text>
      </View>
      <EditSymptomModal symptom={symptom} />
    </View>
  );
}

export function SymptomsCard({ symptoms }: SymptomsCardProps) {
  return (
    <FlatList
      data={symptoms}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <Card symptom={item.descricao} item={item} />}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
