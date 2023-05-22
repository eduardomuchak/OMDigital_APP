import React from 'react';

import { FlatList, View } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode[];
  footerComponent?: JSX.Element;
}

export function CardContainer({
  children,
  footerComponent,
}: CardContainerProps) {
  return (
    <View className="flex-1">
      <FlatList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        data={children}
        renderItem={({ item }) => <View className="px-6">{item}</View>}
        ListFooterComponent={footerComponent ? footerComponent : null}
      />
    </View>
  );
}
