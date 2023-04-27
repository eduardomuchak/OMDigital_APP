import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, FlatList } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode[];
}

export function CardContainer({ children }: CardContainerProps) {
  const { getState } = useNavigation();
  const { routes } = getState();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        overScrollMode="never"
        contentContainerStyle={
          routes[0].name === 'HomeOperador'
            ? { paddingBottom: 96, paddingHorizontal: 24, paddingTop: 4 }
            : { padding: 24 }
        }
        showsVerticalScrollIndicator={false}
        data={children}
        renderItem={({ item }) => <React.Fragment>{item}</React.Fragment>}
      />
    </View>
  );
}
