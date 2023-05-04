import { View } from 'react-native';

import { CardInfo } from './CardInfo';
import { CardTitle } from './CardTitle';

import { Image } from 'phosphor-react-native';

import clsx from 'clsx';

interface SolicitationCardProps {
  id: number;
  codigoBem: string;
  dataSolicitacao: string;
  dataAnalise?: string;
  motivo?: string;
  dataAprovacao?: string;
  status?: string;
}

export function SolicitationCard(props: SolicitationCardProps) {
  return (
    <View
      className={clsx('bg-status-green p-5 rounded-xl justify-center relative', {
        ['bg-status-red']: props.status === 'Manutenção Negada',
        ['bg-status-yellow']: props.status === 'Aguardando Análise',
        ['bg-status-blue']: props.status === 'Em Atendimento',
      })}
    >
      <View className="absolute top-5 right-5">
        <Image color="#FFFFFF" weight="bold" />
      </View>
      <View className="flex-row items-center justify-center mb-3">
        <CardTitle>{props.codigoBem}</CardTitle>
      </View>
      <CardInfo
        codigoBem={props.codigoBem}
        dataSolicitacao={props.dataSolicitacao}
        dataAnalise={props.dataAnalise}
        motivo={props.motivo}
        dataAprovacao={props.dataAprovacao}
      />
    </View>
  );
}
