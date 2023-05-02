import { useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'phosphor-react-native';
import React from 'react';
import { Dimensions, ListRenderItemInfo, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ActivitiesStatus } from '../../../../components/ActivitiesStatus';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { ActivityCard } from '../ActivityCard';
import { ActivityCardProps } from '../ActivityCard/interface';
import { activitiesMock } from '../ActivityCard/mock';
import { FinishActivityModal } from '../FinishActivityModal';
import { PauseActivityModal } from '../PauseActivityModal';
import { StartActivityModal } from '../StartActivityModal';

import { Activity } from '../../../VisaoControladorManutencao/interfaces/Activity';

interface SwipeableActivityCardListProps {
  activities: Activity.Activity[];
}

export const SwipeableActivityCardList = ({ activities }: SwipeableActivityCardListProps) => {
  const { navigate } = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const halfScreenWidth = Number((screenWidth / 2).toFixed(0));

  const HandleStatus = ({ activity }: ActivityCardProps) => {
    switch (activity.status) {
      case 'Concluída':
        return (
          <View className="items-center justify-center">
            <CheckCircle size={56} color="#3a9b15" weight="bold" /> 

            <Text className="font-poppinsMedium text-sm mt-2">Atividade Finalizada!</Text>
          </View>
        );
      case 'Em andamento':
        return (
          <View className="flex flex-row">
            <PauseActivityModal />
            <View className="w-4" />
            <FinishActivityModal isSwipeableTrigger />
          </View>
        );
      default:
        return <StartActivityModal />;
    }
  };

  const listHeaderComponent = () => (
    <>
      <Text className="font-poppinsBold text-lg">Atividades:</Text>
      <ActivitiesStatus />
    </>
  );

  const listFooterComponent = () => (
    <>
      <View className="mt-5 mb-3">
        <CustomButton variant="primary" onPress={() => navigate('RegisterNewActivity')}>
          Adicionar Atividade
        </CustomButton>
      </View>
      <View className="mb-10">
        <CustomButton variant="finish" onPress={() => navigate('CloseMaintenanceOrder')}>
          Finalizar OM
        </CustomButton>
      </View>
    </>
  );

  const renderItem = ({ item }: ListRenderItemInfo<ActivityCardProps['activity']>): JSX.Element => {
    return <ActivityCard activity={item} />;
  };

  const renderHiddenItem = ({
    item,
  }: ListRenderItemInfo<ActivityCardProps['activity']>): JSX.Element => (
    <View
      className={`flex-1 justify-center items-center`}
      style={{
        width: halfScreenWidth,
      }}
    >
      {HandleStatus({ activity: item })}
    </View>
  );

  // const onSwipeValueChange = (swipeData: {
  //   key: string;
  //   value: number;
  //   direction: 'left' | 'right';
  //   isOpen: boolean;
  // }): void => {};

  return (
    <SwipeListView
      style={{ flex: 1, paddingHorizontal: 24, paddingTop: 12 }}
      data={activities}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={halfScreenWidth}
      rightOpenValue={-halfScreenWidth}
      disableLeftSwipe={true}
      disableRightSwipe={false}
      swipeToOpenPercent={30}
      swipeToClosePercent={30}
      ListHeaderComponent={listHeaderComponent}
      ListFooterComponent={listFooterComponent}
      ItemSeparatorComponent={() => <View className="h-3" />}
    />
  );
};
