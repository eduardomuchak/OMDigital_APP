// React and React Native
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { Text, View } from "react-native";

//components
import { FooterRegisteredActivities } from "../../../components/FooterRegisteredActivities";
import { Header } from "../../../components/Header";
import { ActivityCard } from "../components/ActivityCard";
import { CardContainer } from "../components/ActivityCard/CardContainer";
import { OperationInfoCard } from "../components/OperationInfoCard";

import { StatusLegend } from "../../../components/StatusLegend";
import { OMContext } from "../../../contexts/om-context";

export function RegisteredActivities() {
  const { statusLegendInfo, mappedMaintenanceOrder } = useContext(OMContext);

  // get ID from route params
  const route = useRoute();
  const { id } = route.params as { id?: number };

  const filteredOM = mappedMaintenanceOrder.filter((om) => om.id === id);
  const activities = filteredOM[0]?.atividades;

  const operationInfoProps = {
    codigoBem: filteredOM[0]?.codigoBem,
    ordemManutencao: filteredOM[0]?.ordemManutencao,
    operacao: filteredOM[0]?.operacao,
    paradaReal: filteredOM[0]?.paradaReal,
    prevFim: filteredOM[0]?.prevFim,
    latitude: filteredOM[0]?.latitude,
    longitude: filteredOM[0]?.longitude,
    contador: filteredOM[0]?.contador,
    tipo: filteredOM[0]?.tipo,
  };

  const footerInfo = {
    localDeManutencao: filteredOM[0].localDeManutencao!,
    controlador: filteredOM[0].controlador!,
    telefone: filteredOM[0].telefone!,
  };

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title={"Atividades Lançadas"} />
      <OperationInfoCard operationInfo={operationInfoProps} />
      <Text className="mb-3 mt-4 px-6 font-poppinsBold text-[18px]">
        Atividades:
      </Text>
      <StatusLegend status={statusLegendInfo} />
      <CardContainer
        footerComponent={
          <FooterRegisteredActivities controladorInfo={footerInfo} />
        }
      >
        {activities.map((activity) => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
      </CardContainer>
    </View>
  );
}
