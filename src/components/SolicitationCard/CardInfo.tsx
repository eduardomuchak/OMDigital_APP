import React from "react";
import { Text, View } from "react-native";

interface CardInfoProps {
  codigoBem: string;
  dataSolicitacao: string;
  dataAnalise?: string;
  motivo?: string;
  dataAprovacao?: string;
}

export function CardInfo(props: CardInfoProps) {
  return (
    <>
      <View className="flex-row justify-between">
        <Text className="font-poppinsMedium text-base text-white">
          Data Solic.:
        </Text>
        <Text className="font-poppinsMedium text-base text-white">
          {props.dataSolicitacao}
        </Text>
      </View>
      {props.dataAnalise && (
        <View className="flex-row justify-between">
          <Text className="flex-row font-poppinsMedium text-base text-white">
            Data Análise:
          </Text>
          <Text className="font-poppinsMedium text-base text-white">
            {props.dataAnalise}
          </Text>
        </View>
      )}
      {props.dataAprovacao && (
        <View className="flex-row justify-between">
          <Text className="flex-row font-poppinsMedium text-base text-white">
            Data Aprovação:
          </Text>
          <Text className="font-poppinsMedium text-base text-white">
            {props.dataAprovacao}
          </Text>
        </View>
      )}
      {props.motivo && (
        <React.Fragment>
          <Text className="font-poppinsMedium text-base text-white">
            Motivo:
          </Text>
          <Text className="font-poppinsMedium text-base text-white">
            {props.motivo}
          </Text>
        </React.Fragment>
      )}
    </>
  );
}
