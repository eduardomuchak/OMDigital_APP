import { Pressable, View } from 'react-native';

import { CardInfo } from './CardInfo';
import { CardTitle } from './CardTitle';

import clsx from 'clsx';
import { useOperador } from '../../hooks/useOperador';

interface OMCardProps {
  onPress?: () => void;
  id: number;
  codigoBem: string;
  ordemManutencao: string;
  operacao: number;
  paradaReal: string;
  prevFim: string;
  isFinishOrCancel?: boolean;
  status?: string;
  tipo: string;
}

export function OMCard(props: OMCardProps) {
  const {
    operadorDataState: { statusOMs },
  } = useOperador();

  const foundStatus = statusOMs.find((status) => {
    return status.description === props.status;
  });

  return (
    <Pressable onPress={props.onPress} className="items-center">
      <View
        style={{
          backgroundColor: foundStatus?.property,
        }}
        className={clsx(`w-full max-w-lg justify-center rounded-xl p-5`, {
          ['border-2 border-status-green bg-status-concluido']:
            props.status === 'Finalizada',
          ['border-2 border-status-red bg-status-cancelado']:
            props.status === 'Cancelada',
        })}
      >
        <CardTitle status={props.status}>{props.codigoBem}</CardTitle>
        <CardInfo
          codigoBem={props.codigoBem}
          ordemManutencao={props.ordemManutencao}
          operacao={props.operacao}
          paradaReal={props.paradaReal}
          prevFim={props.prevFim}
          tipo={props.tipo}
          isFinishOrCancel={props.isFinishOrCancel}
        />
      </View>
    </Pressable>
  );
}
