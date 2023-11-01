import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Pressable, View } from 'react-native';
import { ListMaintenanceOrder } from '../../services/GET/Maintenance/listMaintenanceOrderById/interface';
import { fetchMainOrderStatus } from '../../services/GET/Status/fetchMaintenanceOrdersStatus';
import { CardInfo } from './CardInfo';
import { CardTitle } from './CardTitle';

interface OMCardProps {
  onPress?: () => void;
  maintenanceOrder: ListMaintenanceOrder.MaintenanceOrder;
}

export function OMCard(props: OMCardProps) {
  const listMainOrderStatus = useQuery({
    queryKey: ['listMainOrderStatus'],
    queryFn: fetchMainOrderStatus,
  });

  if (listMainOrderStatus.data === undefined) {
    return <></>;
  }

  const foundStatus = listMainOrderStatus.data.find((status) => {
    return status.id === props.maintenanceOrder.status;
  });

  return (
    <Pressable onPress={props.onPress} className="items-center">
      <View
        style={{
          backgroundColor: foundStatus?.property,
        }}
        className={clsx(`w-full max-w-lg justify-center rounded-xl p-5`, {
          ['border-2 border-status-green bg-status-concluido']:
            props.maintenanceOrder.status === 7,
          ['border-2 border-status-red bg-status-cancelado']:
            props.maintenanceOrder.status === 8,
        })}
      >
        <CardTitle status={props.maintenanceOrder.status}>
          {props.maintenanceOrder.asset_code}
        </CardTitle>
        <CardInfo maintenanceOrder={props.maintenanceOrder} />
      </View>
    </Pressable>
  );
}
