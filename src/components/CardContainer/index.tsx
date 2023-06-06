import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Dimensions, FlatList, View } from 'react-native';
import { CustomButton } from '../ui/CustomButton';

interface CardContainerProps {
  children: React.ReactNode[];
  renderFooterComponent?: boolean;
}

export function CardContainer({
  children,
  renderFooterComponent = false,
}: CardContainerProps) {
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

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        overScrollMode="never"
        contentContainerStyle={
          routes[0].name === 'HomeOperador'
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
        ListFooterComponent={renderFooterComponent ? FooterComponent : null}
      />
    </View>
  );
}
