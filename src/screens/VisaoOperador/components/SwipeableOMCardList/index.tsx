import { useNavigation } from '@react-navigation/native';
import { CheckCircle, WarningCircle } from 'phosphor-react-native';
import React from 'react';
import { Dimensions, ListRenderItemInfo, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { OMCard } from '../../../../components/OMCard';
import { CancelMaintenanceOrderModal } from '../CancelMaintenanceOrderModal';
import { OMMockProps } from '../FilterModal/interface';
import { FinishMaintenanceOrderModal } from '../FinishMaintenanceOrderModal';

interface MaintenanceOrderCardProps {
  id: number;
  codigoBem: string;
  ordemManutencao: string;
  operacao: string;
  paradaReal: string;
  prevFim: string;
  status: string;
  latitude: string;
  longitude: string;
}

interface SwipeableOMCardListProps {
  maintenanceOrders: OMMockProps;
}

export const SwipeableOMCardList = ({ maintenanceOrders }: any) => {
  const { navigate } = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const halfScreenWidth = Number((screenWidth / 2).toFixed(0));

  const HandleStatus = ({ maintenanceOrders }: SwipeableOMCardListProps) => {
    switch (maintenanceOrders.status) {
      case 'Concluída':
        return (
          <View className="items-center justify-center">
            <CheckCircle size={56} color="#3a9b15" weight="bold" />

            <Text className="font-poppinsMedium text-sm mt-2 text-center">
              Ordem de Manutenção Finalizada!
            </Text>
          </View>
        );
      case 'Cancelada':
        return (
          <View className="items-center justify-center">
            <WarningCircle size={56} color="#B50202" weight="bold" />

            <Text className="font-poppinsMedium text-sm mt-2 text-center">
              Ordem de Manutenção Cancelada!
            </Text>
          </View>
        );
      default:
        return (
          <View className="flex flex-row">
            <CancelMaintenanceOrderModal isSwipeableTrigger />
            <View className="w-4" />
            <FinishMaintenanceOrderModal isSwipeableTrigger />
          </View>
        );
    }
  };

  const renderItem = ({
    item,
  }: ListRenderItemInfo<SwipeableOMCardListProps['maintenanceOrders']>): JSX.Element => {
    return (
      <OMCard
        isFinishOrCancel={item.status === 'Cancelada' || item.status === 'Concluída' ? true : false}
        key={item.id}
        {...item}
        onPress={() =>
          navigate('RegisteredActivitiesOperador', {
            id: item.id,
          })
        }
      />
    );
  };

  const renderHiddenItem = ({
    item,
  }: ListRenderItemInfo<SwipeableOMCardListProps['maintenanceOrders']>): JSX.Element => {
    return (
      <View
        className={`flex-1 justify-center items-center`}
        style={{
          width: halfScreenWidth,
        }}
      >
        {HandleStatus({ maintenanceOrders: item })}
      </View>
    );
  };

  return (
    <SwipeListView
      style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 96 }}
      data={maintenanceOrders}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={halfScreenWidth}
      rightOpenValue={-halfScreenWidth}
      disableLeftSwipe={true}
      disableRightSwipe={false}
      swipeToOpenPercent={30}
      swipeToClosePercent={30}
      ListFooterComponent={() => <View className="h-28" />}
      ItemSeparatorComponent={() => <View className="h-5" />}
      showsVerticalScrollIndicator={false}
    />
  );
};
