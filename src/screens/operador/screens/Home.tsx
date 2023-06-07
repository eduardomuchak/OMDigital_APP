import { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import { Header } from "../../../components/Header";
import { StatusFilter } from "../../../components/StatusFilter";
import { StatusLegend } from "../../../components/StatusLegend";
import { useAuth } from "../../../contexts/auth";
import { OMContext } from "../../../contexts/om-context";
import { FilterModalLogistica } from "../../logistica/components/FilterModalLogistica";
import { Logistica } from "../../logistica/interfaces";
import { AddNewMaintenanceOrderButton } from "../components/AddNewMaintenanceOrderButton";
import { SwipeableOMCardList } from "../components/SwipeableOMCardList";

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

const statusLegendInfo = [
  {
    id: 1,
    name: "Aberta",
    color: "bg-status-green",
  },
  {
    id: 2,
    name: "Aguardando",
    color: "bg-status-yellow",
  },
  {
    id: 3,
    name: "Atrasada",
    color: "bg-status-red",
  },
  {
    id: 4,
    name: "Concluída",
    color: "Concluída",
  },
  {
    id: 5,
    name: "Cancelada",
    color: "Cancelada",
  },
];

export function Home() {
  const { om } = useContext(OMContext);
  const [startPeriod, setStartPeriod] = useState(new Date());
  const [endPeriod, setEndPeriod] = useState(new Date());
  const [codigoBem, setCodigoBem] = useState("");
  const { user } = useAuth();

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

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleChangeCodigoBem(value: string) {
    setCodigoBem(value.trim());
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

    const convertedCreationDate = new Date(item.criadaEm);

    const matchPeriod =
      convertedCreationDate >= startPeriod &&
      convertedCreationDate <= endPeriod;

    const matchCodigoBem = item.codigoBem === codigoBem;

    if (codigoBem === "") {
      return matchStatus && matchOperacao && matchPeriod;
    }

    return matchStatus && matchOperacao && matchCodigoBem && matchPeriod;
  });

  useEffect(() => {
    if (om.length > 0) {
      const dates = om.map((item) => new Date(item.criadaEm).getTime());
      const smallestDate = new Date(Math.min.apply(null, dates));
      const largestDate = new Date(Math.max.apply(null, dates));

      setStartPeriod(smallestDate);
      setEndPeriod(largestDate);
    }
  }, [om]);

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header isHomeScreen title={`Olá, ${user?.user}`} />
      {isModalVisible && (
        <FilterModalLogistica
          onClose={handleCloseModal}
          onConfirm={handleFilterOptionsConfirmation}
          isOpen={isModalVisible}
          allStatus={status}
          isOperador={true}
          startPeriod={startPeriod}
          endPeriod={endPeriod}
          setStartPeriod={setStartPeriod}
          setEndPeriod={setEndPeriod}
          codigoBem={codigoBem}
          handleChangeCodigoBem={handleChangeCodigoBem}
        />
      )}
      <StatusFilter
        openFilterModal={handleOpenModal}
        filterTitle="Operação - TODAS"
      />
      <StatusLegend status={statusLegendInfo} />

      <SwipeableOMCardList maintenanceOrders={filteredOperations} />

      <AddNewMaintenanceOrderButton />
    </View>
  );
}
