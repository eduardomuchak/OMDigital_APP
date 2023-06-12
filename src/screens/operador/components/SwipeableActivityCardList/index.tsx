import { useNavigation } from "@react-navigation/native";
import { CheckCircle } from "phosphor-react-native";
import React from "react";
import { Dimensions, ListRenderItemInfo, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { ActivityCard } from "../ActivityCard";
import { FinishActivityModal } from "../FinishActivityModal";
import { PauseActivityModal } from "../PauseActivityModal";
import { StartActivityModal } from "../StartActivityModal";

import { StatusLegend } from "../../../../components/StatusLegend";
import { OM } from "../../../../interfaces/om-context.interface";

const statusLegendInfo = [
  {
    id: 1,
    name: "Concluída",
    color: "bg-status-green",
  },
  {
    id: 2,
    name: "Em andamento",
    color: "bg-status-yellow",
  },
  {
    id: 3,
    name: "Atrasada",
    color: "bg-status-red",
  },
  {
    id: 4,
    name: "Não iniciada",
    color: "bg-status-blue",
  },
  {
    id: 5,
    name: "Pausada",
    color: "Pausada",
  },
];
interface SwipeableActivityCardListProps {
  activities: OM.Activity[];
  omId: number;
}

export const SwipeableActivityCardList = ({
  activities,
  omId,
}: SwipeableActivityCardListProps) => {
  const { navigate } = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const halfScreenWidth = Number((screenWidth / 2).toFixed(0));

  const HandleStatus = ({ activity }: OM.ActivityProps) => {
    switch (activity.status) {
      case "Concluída":
        return (
          <View className="items-center justify-center">
            <CheckCircle size={56} color="#3a9b15" weight="bold" />
            <Text className="mt-2 font-poppinsMedium text-sm">
              Atividade Finalizada!
            </Text>
          </View>
        );
      case "Em andamento":
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
      <StatusLegend status={statusLegendInfo} />
    </>
  );

  const listFooterComponent = () => (
    <>
      <View className="mb-3 mt-5 space-y-2">
        <CustomButton
          variant="primary"
          onPress={() => navigate("RegisterNewActivity", { id: omId })}
        >
          Adicionar Atividade
        </CustomButton>
        <CustomButton
          variant="primary"
          onPress={() => navigate("RegisterNewSymptom", { id: omId })}
        >
          Adicionar Sintoma
        </CustomButton>
      </View>
      {activities.every((activity) => activity.status === "Concluída") ? (
        <View className="mb-10">
          <CustomButton
            variant="finish"
            onPress={() => navigate("CloseMaintenanceOrder")}
          >
            Finalizar OM
          </CustomButton>
        </View>
      ) : null}
    </>
  );

  const renderItem = ({
    item,
  }: ListRenderItemInfo<OM.ActivityProps["activity"]>): JSX.Element => {
    return <ActivityCard activity={item} />;
  };

  const renderHiddenItem = ({
    item,
  }: ListRenderItemInfo<OM.ActivityProps["activity"]>): JSX.Element => (
    <View
      className={`flex-1 items-center justify-center`}
      style={{
        width: halfScreenWidth,
      }}
    >
      {HandleStatus({ activity: item })}
    </View>
  );

  return (
    <SwipeListView
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 12,
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
