import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { Dimensions, FlatList, RefreshControl, Text, View } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode[];
  isRefetching: boolean;
}

export function CardContainer({ children, isRefetching }: CardContainerProps) {
  const { getState } = useNavigation();
  const { routes } = getState();
  const queryClient = useQueryClient();

  const screenWidth = Dimensions.get('window').width;

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
    queryClient.invalidateQueries({ queryKey: ['listStageStatus'] });
    queryClient.invalidateQueries({ queryKey: ['allOperations'] });
    queryClient.invalidateQueries({ queryKey: ['listOperation'] });
    queryClient.invalidateQueries({ queryKey: ['listMainOrderStatus'] });
    queryClient.invalidateQueries({ queryKey: ['getPrincipalFooterData'] });
  };

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
        ListEmptyComponent={() => (
          <View className="my-48 flex flex-1 flex-row items-center justify-center">
            <Text className="text-neutral font-poppinsBold text-lg">
              Nenhuma informação encontrada
            </Text>
          </View>
        )}
        renderItem={({ item }) => <React.Fragment>{item}</React.Fragment>}
        ItemSeparatorComponent={() => <View className="h-3" />}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
