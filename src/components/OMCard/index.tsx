import { View, Pressable } from 'react-native';

import { CardTitle } from './CardTitle';
import { CardInfo } from './CardInfo';

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
    <Pressable className="py-4" onPress={props.onPress}>
      <View
        className={clsx('bg-status-green gap-1 px-5 h-44 rounded-xl justify-center', {
          ['bg-status-red']: props.status === 'Atrasada',
          ['bg-status-yellow']: props.status === 'Aguardando',
          ['bg-statusCancelado border-2 border-status-red']: props.status === 'Cancelada',
          ['bg-statusConcluido border-2 border-status-green']: props.status === 'Concluída',
        })}
      >
        <View className="py-3">
          <CardTitle status={props.status}>{props.codigoBem}</CardTitle>
        </View>
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
