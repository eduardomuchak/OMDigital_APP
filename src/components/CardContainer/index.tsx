import React from 'react';

import { View, FlatList } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode[];
}

export function CardContainer({ children }: CardContainerProps) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        overScrollMode="never"
        contentContainerStyle={{ padding: 24, paddingBottom: 96 }}
        showsVerticalScrollIndicator={false}
        data={children}
        renderItem={({ item }) => <React.Fragment>{item}</React.Fragment>}
      />
    </View>
  );
}
