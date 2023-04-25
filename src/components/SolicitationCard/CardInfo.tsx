import React from 'react';
import { Text, View } from 'react-native';

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
        <Text className="text-base text-white font-poppinsMedium">Data Solic.:</Text>
        <Text className="text-base text-white font-poppinsMedium">{props.dataSolicitacao}</Text>
      </View>
      {props.dataAnalise && (
        <View className="flex-row justify-between">
          <Text className="text-base text-white font-poppinsMedium flex-row">Data Análise:</Text>
          <Text className="text-base text-white font-poppinsMedium">{props.dataAnalise}</Text>
        </View>
      )}
      {props.dataAprovacao && (
        <View className="flex-row justify-between">
          <Text className="text-base text-white font-poppinsMedium flex-row">Data Aprovação:</Text>
          <Text className="text-base text-white font-poppinsMedium">{props.dataAprovacao}</Text>
        </View>
      )}
      {props.motivo && (
        <React.Fragment>
          <Text className="text-base text-white font-poppinsMedium">Motivo:</Text>
          <Text className="text-base text-white font-poppinsMedium">{props.motivo}</Text>
        </React.Fragment>
      )}
    </>
  );
}
