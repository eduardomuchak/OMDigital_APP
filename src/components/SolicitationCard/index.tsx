import clsx from 'clsx';
import { View } from 'react-native';

import { Solicitations } from '../../services/GET/Solicitations/index.interface';
import { AttachmentPreviewModal } from '../AttachmentPreviewModal';
import { CardInfo } from './CardInfo';
import { CardTitle } from './CardTitle';

export function SolicitationCard(props: Solicitations.Fetch) {
  return (
    <View
      className={clsx(
        'relative justify-center rounded-xl bg-status-green p-5',
        {
          ['bg-[#ffdab9]']: props.status === 1,
          ['bg-[#c1dab9]']: props.status === 2,
          ['bg-[#fdc6c3]']: props.status === 3,
        },
      )}
    >
      <View className="absolute right-4 top-4">
        {props.images.length > 0 ? (
          <AttachmentPreviewModal images={props.images} />
        ) : null}
      </View>
      <View className="mb-3 flex-row items-center justify-center">
        <CardTitle>{props.asset_code}</CardTitle>
      </View>
      <CardInfo
        codigoBem={props.asset_code}
        dataSolicitacao={props.datetime}
        motivo={props.report}
      />
    </View>
  );
}
