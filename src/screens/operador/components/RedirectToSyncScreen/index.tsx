import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { NewMaintenanceOrder } from '../../../../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';
import { EditedMaintenanceOrder } from '../../../../services/POST/OMs/editMaintenanceOrder/index.interface';

export function RedirectToSyncScreen() {
  const { navigate } = useNavigation();

  const [queuedCreateNewMaintenanceOrder, setMaintenanceOrdersQueue] =
    useMMKVObject<NewMaintenanceOrder.Payload[]>(
      'queuedCreateNewMaintenanceOrder',
    );
  if (queuedCreateNewMaintenanceOrder === undefined)
    setMaintenanceOrdersQueue([]);

  const [queuedEditMaintenanceOrder, setQueuedEditMaintenanceOrder] =
    useMMKVObject<EditedMaintenanceOrder[]>('queuedEditMaintenanceOrder');
  if (queuedEditMaintenanceOrder === undefined)
    setQueuedEditMaintenanceOrder([]);

  const isCreateOMQueueValid =
    queuedCreateNewMaintenanceOrder &&
    queuedCreateNewMaintenanceOrder.length > 0;
  const isEditOMQueueValid =
    queuedEditMaintenanceOrder && queuedEditMaintenanceOrder.length > 0;

  const isQueueValid = isCreateOMQueueValid || isEditOMQueueValid;

  return (
    <>
      {isQueueValid && (
        <View className="flex flex-col space-y-2 bg-nepomuceno-dark-blue px-5 py-2">
          <Text className="font-poppinsBold text-sm text-white">
            Quantidade de requisições na fila para sincronizar:{' '}
            {queuedCreateNewMaintenanceOrder!.length +
              queuedEditMaintenanceOrder!.length}
          </Text>
          <CustomButton
            variant="finish"
            onPress={() => navigate('SyncOperator')}
          >
            Sincronizar
          </CustomButton>
        </View>
      )}
    </>
  );
}

export default RedirectToSyncScreen;
