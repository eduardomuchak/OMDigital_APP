import React from 'react';

import { FlatList, RefreshControl, View } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode[];
  footerComponent?: JSX.Element;
  headerComponent?: JSX.Element;
  isRefetching: boolean;
  onRefresh: () => void;
}

export function CardContainer({
  children,
  footerComponent,
  headerComponent,
  isRefetching,
  onRefresh,
}: CardContainerProps) {
  return (
    <View className="flex-1">
      <FlatList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        data={children}
        renderItem={({ item }) => <View className="px-6">{item}</View>}
        ListFooterComponent={footerComponent ? footerComponent : null}
        ListHeaderComponent={headerComponent ? headerComponent : null}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
