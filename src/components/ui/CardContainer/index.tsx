import { View, ScrollView, FlatList } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode;
}

export function CardContainer({ children }: CardContainerProps) {
  return (
    <View className="flex-1">
      <ScrollView overScrollMode="never" contentContainerStyle={{ padding: 24 }}>
        {children}
      </ScrollView>
    </View>
  );
}
