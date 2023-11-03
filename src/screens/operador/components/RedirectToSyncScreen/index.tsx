import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { NewMaintenanceOrder } from '../../../../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';
import { EditedMaintenanceOrder } from '../../../../services/POST/OMs/editMaintenanceOrder/index.interface';

interface StageQueue {
  activityId: number;
  manPowerId: string | null | undefined;
}

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

  const [queuedPauseActivity, setQueuedPauseActivity] = useMMKVObject<
    StageQueue[]
  >('queuedPauseActivity');
  if (queuedPauseActivity === undefined) setQueuedPauseActivity([]);

  const [queuedStartActivity, setQueuedStartActivity] = useMMKVObject<
    StageQueue[]
  >('queuedStartActivity');
  if (queuedStartActivity === undefined) setQueuedStartActivity([]);

  const [queuedResumeActivity, setQueuedResumeActivity] = useMMKVObject<
    StageQueue[]
  >('queuedResumeActivity');

  if (queuedResumeActivity === undefined) setQueuedResumeActivity([]);

  const isCreateOMQueueValid =
    queuedCreateNewMaintenanceOrder &&
    queuedCreateNewMaintenanceOrder.length > 0;

  const isEditOMQueueValid =
    queuedEditMaintenanceOrder && queuedEditMaintenanceOrder.length > 0;

  const isPauseActivityQueueValid =
    queuedPauseActivity && queuedPauseActivity.length > 0;

  const isStartActivityQueueValid =
    queuedStartActivity && queuedStartActivity.length > 0;

  const isResumeActivityQueueValid =
    queuedResumeActivity && queuedResumeActivity.length > 0;

  const isQueueValid =
    isCreateOMQueueValid ||
    isEditOMQueueValid ||
    isPauseActivityQueueValid ||
    isStartActivityQueueValid ||
    isResumeActivityQueueValid;

  const queueLength =
    queuedCreateNewMaintenanceOrder!.length +
    queuedEditMaintenanceOrder!.length +
    queuedPauseActivity!.length +
    queuedStartActivity!.length +
    queuedResumeActivity!.length;

  return (
    <>
      {isQueueValid && (
        <View className="flex flex-col space-y-2 bg-nepomuceno-dark-blue px-5 py-2">
          <Text className="font-poppinsBold text-sm text-white">
            Quantidade de requisições na fila para sincronizar: {queueLength}
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
