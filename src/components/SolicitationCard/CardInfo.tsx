import React from 'react';
import { Text, View } from 'react-native';
import { formatISOStringToPTBRDateString } from '../../utils/formatISOStringToPTBRDateString';

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
        <Text className="font-poppinsMedium text-base text-zinc-900">
          Data Solic.:
        </Text>
        <Text className="font-poppinsMedium text-base text-zinc-900">
          {formatISOStringToPTBRDateString(props.dataSolicitacao)}
        </Text>
      </View>
      {props.dataAnalise && (
        <View className="flex-row justify-between">
          <Text className="flex-row font-poppinsMedium text-base text-zinc-900">
            Data Análise:
          </Text>
          <Text className="font-poppinsMedium text-base text-zinc-900">
            {props.dataAnalise}
          </Text>
        </View>
      )}
      {props.dataAprovacao && (
        <View className="flex-row justify-between">
          <Text className="flex-row font-poppinsMedium text-base text-zinc-900">
            Data Aprovação:
          </Text>
          <Text className="font-poppinsMedium text-base text-zinc-900">
            {props.dataAprovacao}
          </Text>
        </View>
      )}
      {props.motivo && (
        <React.Fragment>
          <Text className="font-poppinsMedium text-base text-zinc-900">
            Motivo:
          </Text>
          <Text className="font-poppinsMedium text-base text-zinc-900">
            {props.motivo}
          </Text>
        </React.Fragment>
      )}
    </>
  );
}
