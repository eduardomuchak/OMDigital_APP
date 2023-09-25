import { useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'phosphor-react-native';
import React from 'react';
import {
  Dimensions,
  ListRenderItemInfo,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { ActivityCard } from '../ActivityCard';
import { FinishActivityModal } from '../FinishActivityModal';
import { PauseActivityModal } from '../PauseActivityModal';
import { StartActivityModal } from '../StartActivityModal';

import { useQuery } from '@tanstack/react-query';
import { StatusLegend } from '../../../../components/StatusLegend';
import { fetchOMFromAPI } from '../../../../services/GET/OMs/fetchAllOms/fetchOM';
import { fetchStagesStatus } from '../../../../services/GET/Status/fetchStagesStatus';
import { Stage } from '../../../../services/POST/Stages/stages.interface';
import { formatStagesStatus } from '../../../../utils/formatMaintenanceOrderStatus';
import { OperationInfoCard } from '../../../manutencao/components/OperationInfoCard';

interface SwipeableActivityCardListProps {
  activities: Stage.StagesList[];
  omId: number;
}

export const SwipeableActivityCardList = ({
  activities,
  omId,
}: SwipeableActivityCardListProps) => {
  const { navigate } = useNavigation();

  const listStageStatus = useQuery({
    queryKey: ['listStageStatus'],
    queryFn: fetchStagesStatus,
  });
  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: fetchOMFromAPI,
  });

  if (
    listMaintenanceOrder.isLoading ||
    listMaintenanceOrder.data === undefined
  ) {
    return <></>;
  }

  if (listStageStatus.isLoading || listStageStatus.data === undefined) {
    return <></>;
  }

  const screenWidth = Dimensions.get('window').width;
  const halfScreenWidth = Number((screenWidth / 2).toFixed(0));

  const HandleStatus = ({ stage }: Stage.StagesListProps) => {
    switch (formatStagesStatus(stage.status)) {
      case 'Concluída':
        return (
          <View className="items-center justify-center">
            <CheckCircle size={56} color="#3a9b15" weight="bold" />
            <Text className="mt-2 font-poppinsMedium text-sm">
              Etapa Finalizada!
            </Text>
          </View>
        );
      case 'Iniciada':
        return (
          <View className="flex flex-row">
            <PauseActivityModal omId={omId} activityId={stage.id} />
            <View className="w-4" />
            <FinishActivityModal
              isSwipeableTrigger
              omId={omId}
              activityId={stage.id}
            />
          </View>
        );
      default:
        return <StartActivityModal omId={omId} activityId={stage.id} />;
    }
  };

  const listHeaderComponent = () => (
    <>
      <OperationInfoCard
        maintenanceOrder={
          listMaintenanceOrder.data.filter((om) => om.id === omId)[0]
        }
        isOperador
      />
      <View className="mt-2 px-6">
        <Text className="font-poppinsBold text-lg">Etapas:</Text>
        <StatusLegend status={listStageStatus.data} />
      </View>
    </>
  );

  const listFooterComponent = () => (
    <>
      <View className="mb-3 mt-5 space-y-2 px-6">
        <CustomButton
          variant="primary"
          onPress={() => navigate('RegisterNewActivity', { id: omId })}
        >
          Adicionar Etapa
        </CustomButton>
        <CustomButton
          variant="primary"
          onPress={() => navigate('RegisterNewSymptom', { id: omId })}
        >
          Adicionar Sintoma
        </CustomButton>
      </View>
      {activities.every(
        (activity) => formatStagesStatus(activity.status) === 'Concluída',
      ) && activities.length > 0 ? (
        <View className="mb-10 px-6">
          <CustomButton
            variant="finish"
            onPress={() => navigate('CloseMaintenanceOrder', { id: omId })}
          >
            Finalizar OM
          </CustomButton>
        </View>
      ) : null}
    </>
  );

  const renderItem = ({
    item,
  }: ListRenderItemInfo<Stage.StagesListProps['stage']>): JSX.Element => {
    return (
      <View className="px-6">
        <ActivityCard stage={item} />
      </View>
    );
  };

  const renderHiddenItem = ({
    item,
  }: ListRenderItemInfo<Stage.StagesListProps['stage']>): JSX.Element => (
    <View
      className={`flex-1 items-center justify-center`}
      style={{
        width: halfScreenWidth,
      }}
    >
      {HandleStatus({ stage: item })}
    </View>
  );

  if (activities.length === 0)
    return (
      <ScrollView
        className="flex flex-1 flex-col bg-white"
        showsVerticalScrollIndicator={false}
      >
        {listHeaderComponent()}
        <View className="flex flex-1 items-center justify-center py-10">
          <Text className="text-neutral text-center font-poppinsBold text-lg">
            Nenhuma etapa cadastrada
          </Text>
        </View>
        {listFooterComponent()}
      </ScrollView>
    );

  return (
    <SwipeListView
      style={{
        flex: 1,
        marginBottom: 24,
      }}
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
      showsVerticalScrollIndicator={false}
    />
  );
};
