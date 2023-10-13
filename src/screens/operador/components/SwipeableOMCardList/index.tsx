import { useNavigation } from '@react-navigation/native';
import { CheckCircle, WarningCircle } from 'phosphor-react-native';
import React from 'react';
import { Dimensions, ListRenderItemInfo, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { OMCard } from '../../../../components/OMCard';
import { ListMaintenanceOrder } from '../../../../services/GET/Maintenance/listMaintenanceOrderById/interface';
import { CancelMaintenanceOrderModal } from '../CancelMaintenanceOrderModal';
import { FinishMaintenanceOrderModal } from '../FinishMaintenanceOrderModal';

interface SwipeableOMCardListProps {
  maintenanceOrders: ListMaintenanceOrder.MaintenanceOrder[];
}

export const SwipeableOMCardList = ({
  maintenanceOrders,
}: SwipeableOMCardListProps) => {
  const { navigate } = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const halfScreenWidth = Number((screenWidth / 2).toFixed(0));

  const HandleStatus = (
    maintenanceOrders: ListMaintenanceOrder.MaintenanceOrder,
  ) => {
    switch (maintenanceOrders.status) {
      case 7:
        // Finalizada
        return (
          <View className="items-center justify-center">
            <CheckCircle size={56} color="#3a9b15" weight="bold" />

            <Text className="mt-2 text-center font-poppinsMedium text-sm">
              Ordem de Manutenção Finalizada!
            </Text>
          </View>
        );
      case 8:
        // Cancelada
        return (
          <View className="items-center justify-center">
            <WarningCircle size={56} color="#B50202" weight="bold" />

            <Text className="mt-2 text-center font-poppinsMedium text-sm">
              Ordem de Manutenção Cancelada!
            </Text>
          </View>
        );
      default:
        return (
          <View className="flex flex-row">
            <CancelMaintenanceOrderModal
              isSwipeableTrigger
              omId={maintenanceOrders.id}
            />
            <View className="w-4" />
            <FinishMaintenanceOrderModal
              isSwipeableTrigger
              omId={maintenanceOrders.id}
            />
          </View>
        );
    }
  };

  const renderItem = ({
    item,
  }: ListRenderItemInfo<ListMaintenanceOrder.MaintenanceOrder>): JSX.Element => {
    return (
      <OMCard
        key={item.id}
        onPress={() =>
          navigate('RegisteredActivitiesOperador', {
            id: item.id,
          })
        }
        maintenanceOrder={item}
      />
    );
  };

  const renderHiddenItem = ({
    item,
  }: ListRenderItemInfo<ListMaintenanceOrder.MaintenanceOrder>): JSX.Element => {
    return (
      <View
        className={`flex-1 items-center justify-center `}
        style={{
          width: halfScreenWidth,
        }}
      >
        {HandleStatus(item)}
      </View>
    );
  };

  return (
    <>
      {maintenanceOrders.length > 0 ? (
        <SwipeListView
          style={{
            paddingHorizontal: screenWidth > 500 ? 0 : 24,
            paddingTop: 12,
            paddingBottom: 96,
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            alignSelf: 'center',
          }}
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
          ItemSeparatorComponent={() => <View className="h-3" />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral px-5 text-center font-poppinsBold text-lg">
            Nenhuma ordem de manutenção foi encontrada
          </Text>
        </View>
      )}
    </>
  );
};
