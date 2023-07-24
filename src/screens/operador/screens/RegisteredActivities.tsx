import { useRoute } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { View } from "react-native";

import { Header } from "../../../components/Header";

import { OMContext } from "../../../contexts/om-context";
import { OperationInfoCard } from "../../manutencao/components/OperationInfoCard";
import { SwipeableActivityCardList } from "../components/SwipeableActivityCardList";

export function RegisteredActivities() {
  const { mappedMaintenanceOrder, handleLegendStageStatus } =
    useContext(OMContext);
  const route = useRoute();
  const { id } = route.params as { id: number };

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

  const symptoms = filteredOM[0]?.sintomas;

  useEffect(() => {
    handleLegendStageStatus();
  }, []);

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title={"Etapas Lançadas"} />
      <OperationInfoCard
        operador={true}
        operationInfo={operationInfoProps}
        operationId={id}
        symptoms={symptoms}
      />
      <SwipeableActivityCardList activities={activities} omId={id} />
    </View>
  );
}
