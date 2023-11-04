import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { CustomButton } from '../../../../components/ui/CustomButton';

export function RedirectToSyncScreen() {
  const { navigate } = useNavigation();

  const [acceptedRequestsQueue, setAcceptedRequestsQueue] = useMMKVObject<
    number[]
  >('acceptedRequestsQueue');
  if (acceptedRequestsQueue === undefined) setAcceptedRequestsQueue([]);

  const [dismissedRequestsQueue, setDismissedRequestsQueue] = useMMKVObject<
    number[]
  >('dismissedRequestsQueue');
  if (dismissedRequestsQueue === undefined) setDismissedRequestsQueue([]);

  const isAcceptedRequestQueueValid =
    acceptedRequestsQueue && acceptedRequestsQueue.length > 0;

  const isDismissedRequestQueueValid =
    dismissedRequestsQueue && dismissedRequestsQueue.length > 0;

  const isQueueValid =
    isAcceptedRequestQueueValid || isDismissedRequestQueueValid;

  const queueLength =
    acceptedRequestsQueue!.length + dismissedRequestsQueue!.length;

  return (
    <>
      {isQueueValid && (
        <View className="flex flex-col space-y-2 bg-nepomuceno-dark-blue px-5 py-2">
          <Text className="font-poppinsBold text-sm text-white">
            Quantidade de requisições na fila para sincronizar: {queueLength}
          </Text>
          <CustomButton
            variant="finish"
            onPress={() => navigate('SyncManutencao')}
          >
            Sincronizar
          </CustomButton>
        </View>
      )}
    </>
  );
}

export default RedirectToSyncScreen;
