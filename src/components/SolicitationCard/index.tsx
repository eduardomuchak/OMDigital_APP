import clsx from 'clsx';
import { View } from 'react-native';

import { AttachmentPreviewModal } from '../AttachmentPreviewModal';
import { CardInfo } from './CardInfo';
import { CardTitle } from './CardTitle';

interface SolicitationCardProps {
  id: number;
  codigoBem: string;
  dataSolicitacao: string;
  dataAnalise?: string;
  motivo?: string;
  dataAprovacao?: string;
  status?: string;
  images: string[];
}

export function SolicitationCard(props: SolicitationCardProps) {
  return (
    <View
      className={clsx(
        'relative justify-center rounded-xl bg-status-green p-5',
        {
          ['bg-status-red']: props.status === 'Manutenção Negada',
          ['bg-status-yellow']: props.status === 'Aguardando Análise',
          ['bg-status-blue']: props.status === 'Em Atendimento',
        },
      )}
    >
      <View className="absolute right-4 top-4">
        {props.images.length > 0 ? (
          <AttachmentPreviewModal images={props.images} />
        ) : null}
      </View>
      <View className="mb-3 flex-row items-center justify-center">
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
