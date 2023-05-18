import { useContext, useState } from "react";
import { View } from "react-native";

import { CardContainer } from "../../../components/CardContainer";
import { FooterModal } from "../../../components/FooterModal";
import { Header } from "../../../components/Header";
import { OMCard } from "../../../components/OMCard";
import { StatusFilter } from "../../../components/StatusFilter";
import { FilterModalLogistica } from "../components/FilterModalLogistica";

import { OperationsStatus } from "../../../components/OperationsStatus";
import { useAuth } from "../../../contexts/auth";
import { OMContext } from "../../../contexts/om-context";
import { Logistica } from "../interfaces";

const operationsMock = [
  {
    id: 1,
    name: "Operação 1",
  },
  {
    id: 2,
    name: "Operação 2",
  },
  {
    id: 3,
    name: "Operação 3",
  },
];

export function Home() {
  const { om } = useContext(OMContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState({
    todas: true,
    abertas: false,
    aguardando: false,
    concluidas: false,
    canceladas: false,
  });
  const [operations, setOperations] = useState(
    operationsMock.map((operation) => {
      return {
        showAll: true,
        [operation.name]: false,
      };
    })
  );
  const { user } = useAuth();

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleFilterOptionsConfirmation(
    pickedStatus: Logistica.StatusFilterStateOptions,
    pickedOperations: Logistica.OperationState[]
  ) {
    setStatus(pickedStatus);
    setOperations(pickedOperations);
    setIsModalVisible(false);
  }

  const filteredOperations = om.filter((item) => {
    const matchStatus =
      status.todas ||
      (item.status === "Aberta" && status.abertas) ||
      (item.status === "Aguardando" && status.aguardando) ||
      (item.status === "Concluída" && status.concluidas) ||
      (item.status === "Cancelada" && status.canceladas);
    const matchOperacao = operations.every(
      (operation) => operation.showAll || operation[item.operacao]
    );

    return matchStatus && matchOperacao;
  });

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header isHomeScreen title={`Olá, ${user?.user}`} />
      {isModalVisible && (
        <FilterModalLogistica
          onClose={handleCloseModal}
          onConfirm={handleFilterOptionsConfirmation}
          isOpen={isModalVisible}
          allStatus={status}
        />
      )}
      <StatusFilter
        openFilterModal={handleOpenModal}
        filterTitle="Operação - TODAS"
      />
      <OperationsStatus />
      <CardContainer>
        {filteredOperations.map((item) => (
          <OMCard
            isFinishOrCancel={
              item.status === "Cancelada" || item.status === "Concluída"
                ? true
                : false
            }
            key={item.id}
            {...item}
          />
        ))}
      </CardContainer>
      <FooterModal />
    </View>
  );
}
