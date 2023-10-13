import { Text, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { ListMaintenanceOrder } from '../../services/GET/Maintenance/listMaintenanceOrderById/interface';
import { fetchOperationsFromAPI } from '../../services/GET/Operations/fetchOperations';
import { formatISOStringToPTBRDateString } from '../../utils/formatISOStringToPTBRDateString';
import { omIDFormatter } from '../../utils/omIDFormatter';
import { operationNameFormatter } from '../../utils/operationNameFormatter';

interface CardInfoProps {
  maintenanceOrder: ListMaintenanceOrder.MaintenanceOrder;
}

export function CardInfo(props: CardInfoProps) {
  const isFinishOrCancel =
    props.maintenanceOrder.status === 7 || props.maintenanceOrder.status === 8;

  const listOperation = useQuery({
    queryKey: ['allOperations'],
    queryFn: fetchOperationsFromAPI,
  });

  const foundOperation = listOperation.data?.find((operation) => {
    return (
      operation.operationCode === props.maintenanceOrder.asset_operation_code
    );
  });

  const paradaReal = formatISOStringToPTBRDateString(
    props.maintenanceOrder.start_prev_date +
      'T' +
      props.maintenanceOrder.start_prev_hr +
      '.000Z',
  );

  const prevFim = formatISOStringToPTBRDateString(
    props.maintenanceOrder.end_prev_date +
      'T' +
      props.maintenanceOrder.end_prev_hr +
      '.000Z',
  );

  const tipo =
    props.maintenanceOrder.service_type === 'C' ? 'Corretiva' : 'Preventiva';

  return (
    <>
      <Text
        className={clsx('font-poppinsMedium text-base text-neutral-900', {
          ['font-poppinsMedium text-neutral-900']: isFinishOrCancel,
        })}
      >
        OM: {omIDFormatter(props.maintenanceOrder.id)}
      </Text>
      {foundOperation && (
        <Text
          className={clsx('font-poppinsMedium text-base text-neutral-900', {
            ['font-poppinsMedium text-neutral-900']: isFinishOrCancel,
          })}
        >
          {`Operação: ${operationNameFormatter(foundOperation.operation)}`}
        </Text>
      )}
      <Text
        className={clsx('font-poppinsMedium text-base text-neutral-900', {
          ['font-poppinsMedium text-neutral-900']: isFinishOrCancel,
        })}
      >
        {`Tipo: ${tipo}`}
      </Text>
      <View className="flex-row justify-between">
        <Text
          className={clsx('font-poppinsMedium text-base text-neutral-900', {
            ['font-poppinsMedium text-neutral-900']: isFinishOrCancel,
          })}
        >
          Par. Real:{' '}
        </Text>
        <Text
          className={clsx('font-poppinsMedium text-base text-neutral-900', {
            ['font-poppinsMedium text-neutral-900']: isFinishOrCancel,
          })}
        >
          {paradaReal === 'NaN' ? 'Período não informado' : paradaReal}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text
          className={clsx(
            'flex-row font-poppinsMedium text-base text-neutral-900',
            {
              ['font-poppinsMedium text-neutral-900']: isFinishOrCancel,
            },
          )}
        >
          Prev. Fim:{' '}
        </Text>
        <Text
          className={clsx('font-poppinsMedium text-base text-neutral-900', {
            ['font-poppinsMedium text-neutral-900']: isFinishOrCancel,
          })}
        >
          {prevFim === 'NaN' ? 'Período não informado' : prevFim}
        </Text>
      </View>
    </>
  );
}
