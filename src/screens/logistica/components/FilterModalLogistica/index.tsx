import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { CustomButton } from "../../../../components/ui/CustomButton";
import { CustomModal } from "../../../../components/ui/Modal";
import { OperationsFilterOptions } from "./OperationsFilterOptions";
import { StatusFilterOptions } from "./StatusFilterOptions";

import { Logistica } from "../../interfaces";

import { QRCodeScannerInput } from "../../../../components/QRCodeScannerInput";
import { Select } from "../../../../components/ui/Select";
import { DateFilterOptions } from "./DateFilterOptions";

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

export function FilterModalLogistica({
  isOpen,
  onClose,
  onConfirm,
  isOperador,
  startPeriod,
  endPeriod,
  setStartPeriod,
  setEndPeriod,
  handleChangeCodigoBem,
  codigoBem,
}: Logistica.FilterModalProps) {
  const [allStatus, setAllStatus] = useState({
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
  const [osType, setOsType] = useState("todas");

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ScrollView
        className="max-h-[650px]"
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-poppinsBold">
          Selecione as ordens a serem exibidas por status e/ou por operação:
        </Text>

        {/* FILTRO DE STATUS */}
        <StatusFilterOptions
          changeStatus={setAllStatus}
          allStatus={allStatus}
        />

        {/* FILTRO DO CÓDIGO DO BEM */}
        <QRCodeScannerInput handleChangeCodigoBem={handleChangeCodigoBem} />

        {/* FILTRO DE OPERAÇÕES */}
        {codigoBem.length === 0 ? (
          <OperationsFilterOptions
            operations={operations}
            changeOperation={setOperations}
          />
        ) : null}

        {/* FILTRO DE TIPO DE OS */}
        <View className="py-4">
          <Text className="-mb-2 font-poppinsBold">Tipo da OS:</Text>
          <Select
            label=""
            selected={osType}
            setSelected={setOsType}
            options={[]}
          />
        </View>

        {/* FILTRO DE PERÍODO */}
        {isOperador && (
          <DateFilterOptions
            startPeriod={startPeriod!}
            endPeriod={endPeriod!}
            setStartPeriod={setStartPeriod!}
            setEndPeriod={setEndPeriod!}
          />
        )}

        {/* BOTÕES DE CONFIRMAR E CANCELAR */}
        <View className="mt-4 flex flex-row justify-between">
          <View className="w-[48%]">
            <CustomButton
              onPress={() => {
                setAllStatus({
                  todas: true,
                  abertas: false,
                  aguardando: false,
                  concluidas: false,
                  canceladas: false,
                });
                onClose();
              }}
              variant="cancel"
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton
              onPress={() => onConfirm(allStatus, operations)}
              variant="primary"
            >
              Confirmar
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </CustomModal>
  );
}
