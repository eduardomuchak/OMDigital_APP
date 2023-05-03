import { Pressable, View } from 'react-native';

import { CardInfo } from './CardInfo';
import { CardTitle } from './CardTitle';

import clsx from 'clsx';

interface OMCardProps {
  onPress?: () => void;
  id: number;
  codigoBem: string;
  ordemManutencao: string;
  operacao: string;
  paradaReal: string;
  prevFim: string;
  isFinishOrCancel?: boolean;
  status?: string;
}

export function OMCard(props: OMCardProps) {
  return (
    <Pressable onPress={props.onPress}>
      <View
        className={clsx('bg-status-green p-5 rounded-xl justify-center', {
          ['bg-status-red']: props.status === 'Atrasada',
          ['bg-status-yellow']: props.status === 'Aguardando',
          ['bg-status-cancelado border-2 border-status-red']: props.status === 'Cancelada',
          ['bg-status-concluido border-2 border-status-green']: props.status === 'Concluída',
        })}
      >
        <CardTitle status={props.status}>{props.codigoBem}</CardTitle>
        <CardInfo
          codigoBem={props.codigoBem}
          ordemManutencao={props.ordemManutencao}
          operacao={props.operacao}
          paradaReal={props.paradaReal}
          prevFim={props.prevFim}
          isFinishOrCancel={props.isFinishOrCancel}
        />
      </View>
    </Pressable>
  );
}
