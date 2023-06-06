import { FlatList, Text, View } from 'react-native';

import React from 'react';
import { openedRequestsMock } from '../../../mocks/solicitacoes';
import { OpenedRequestCard } from '../components/OpenedRequestCard';

export function OpenedRequests() {
  const ListHeader = () => {
    return (
      <View className="bg-white px-6">
        <Text className="mb-3 mt-5 text-center font-poppinsBold text-lg">
          Solicitações Abertas
        </Text>
      </View>
    );
  };

  return (
    <View className="flex flex-1 flex-col bg-white">
      <FlatList
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        showsVerticalScrollIndicator={false}
        data={openedRequestsMock}
        renderItem={({ item }) => (
          <OpenedRequestCard key={item.id} request={item} />
        )}
      />
    </View>
  );
}
