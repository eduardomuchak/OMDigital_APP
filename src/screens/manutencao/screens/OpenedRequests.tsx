import { FlatList, Text, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Loading } from '../../../components/Loading';
import { fetchSolicitations } from '../../../services/GET/Solicitations/fetchSolicitations';
import { OpenedRequestCard } from '../components/OpenedRequestCard';

export function OpenedRequests() {
  const listRequest = useQuery({
    queryKey: ['listRequest'],
    queryFn: fetchSolicitations,
  });

  if (listRequest.isLoading) {
    return <Loading />;
  }

  if (listRequest.data === undefined) {
    return <></>;
  }

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
        data={listRequest.data.filter((request) => request.status === 1)}
        renderItem={({ item }) => (
          <OpenedRequestCard key={item.id} request={item} />
        )}
      />
    </View>
  );
}
