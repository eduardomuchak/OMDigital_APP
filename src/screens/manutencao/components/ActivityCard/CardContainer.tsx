import React from 'react';

import { View, FlatList } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode[];
}

export function CardContainer({ children }: CardContainerProps) {
  return (
    <View className="flex-1 px-6 py-3">
      <FlatList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        data={children}
        renderItem={({ item }) => <React.Fragment>{item}</React.Fragment>}
      />
    </View>
  );
}
