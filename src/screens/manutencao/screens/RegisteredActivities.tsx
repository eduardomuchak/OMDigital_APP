// React and React Native
import { useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { SafeAreaView, Text } from "react-native";

//components
import { FooterRegisteredActivities } from "../../../components/FooterRegisteredActivities";
import { Header } from "../../../components/Header";
import { ActivitiesStatusLegend } from "../components/ActivitiesStatusLegend";
import { ActivityCard } from "../components/ActivityCard";
import { CardContainer } from "../components/ActivityCard/CardContainer";
import { LocationModal } from "../components/LocationModal";
import { OperationInfoCard } from "../components/OperationInfoCard";

import { OMContext } from "../../../contexts/om-context";

export function RegisteredActivities() {
  const { om } = useContext(OMContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleOpenLocationModal() {
    setIsModalVisible(true);
  }

  function handleCloseLocationModal() {
    setIsModalVisible(false);
  }

  // get ID from route params
  const route = useRoute();
  const { id } = route.params as { id?: number };

  const filteredOM = om.filter((om) => om.id === id);
  const activities = filteredOM[0]?.atividades;

  const operationInfoProps = {
    codigoBem: filteredOM[0]?.codigoBem,
    ordemManutencao: filteredOM[0]?.ordemManutencao,
    operacao: filteredOM[0]?.operacao,
    paradaReal: filteredOM[0]?.paradaReal,
    prevFim: filteredOM[0]?.prevFim,
  };

  const footerInfo = {
    localDeManutencao: filteredOM[0].localDeManutencao!,
    controlador: filteredOM[0].controlador!,
    telefone: filteredOM[0].telefone!,
  };

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header title={"Atividades Lançadas"} />
      <OperationInfoCard
        operationInfo={operationInfoProps}
        onLocationShow={handleOpenLocationModal}
      />
      {isModalVisible && (
        <LocationModal
          onClose={handleCloseLocationModal}
          isModalVisible={isModalVisible}
          latitude={filteredOM[0]?.latitude!}
          longitude={filteredOM[0]?.longitude!}
        />
      )}
      <Text className="font-poppinsBold text-[18px] px-6 mb-3 mt-4">
        Atividades:
      </Text>
      <ActivitiesStatusLegend />
      <CardContainer>
        {activities.map((activity) => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
      </CardContainer>
      <FooterRegisteredActivities controladorInfo={footerInfo} />
    </SafeAreaView>
  );
}
