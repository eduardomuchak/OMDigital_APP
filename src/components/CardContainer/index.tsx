import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Dimensions, FlatList, View } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode[];
}

export function CardContainer({ children }: CardContainerProps) {
  const { getState } = useNavigation();
  const { routes } = getState();

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        overScrollMode="never"
        contentContainerStyle={
          routes[0].name === 'HomeOperador' ||
          routes[0].name === 'HomeSolicitante'
            ? { paddingBottom: 96, paddingHorizontal: 24, paddingTop: 4 }
            : {
                paddingHorizontal: screenWidth > 500 ? 200 : 24,
                paddingBottom: 24,
              }
        }
        showsVerticalScrollIndicator={false}
        data={children}
        renderItem={({ item }) => <React.Fragment>{item}</React.Fragment>}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </View>
  );
}
