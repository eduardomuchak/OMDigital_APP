import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { FlatList, View } from 'react-native';
import { CustomButton } from '../ui/CustomButton';

interface CardContainerProps {
  children: React.ReactNode[];
  renderFooterComponent?: boolean;
}

export function CardContainer({ children, renderFooterComponent = false }: CardContainerProps) {
  const { getState, navigate } = useNavigation();
  const { routes } = getState();

  const FooterComponent = () => {
    return (
      <CustomButton
        onPress={() => navigate('RegisterNewRequest')}
        variant="primary"
        style={{ marginTop: 20 }}
      >
        Relatar Problema
      </CustomButton>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        overScrollMode="never"
        contentContainerStyle={
          routes[0].name === 'HomeOperador'
            ? { paddingBottom: 96, paddingHorizontal: 24, paddingTop: 4 }
            : { paddingHorizontal: 24, paddingBottom: 24 }
        }
        showsVerticalScrollIndicator={false}
        data={children}
        renderItem={({ item }) => <React.Fragment>{item}</React.Fragment>}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListFooterComponent={renderFooterComponent ? FooterComponent : null}
      />
    </View>
  );
}
