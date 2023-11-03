import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { CustomButton } from '../../../components/ui/CustomButton';
import { SaveRequest } from '../../../services/POST/Solicitations/saveRequest/saveRequest.interface';

export function RedirectToSyncScreen() {
  const { navigate } = useNavigation();

  const [queuedCreateRequest, setQueuedCreateRequest] = useMMKVObject<
    SaveRequest[]
  >('queuedCreateRequest');
  if (queuedCreateRequest === undefined) setQueuedCreateRequest([]);

  const isCreateRequestQueueValid =
    queuedCreateRequest && queuedCreateRequest.length > 0;

  const queueLength = queuedCreateRequest!.length;

  return (
    <>
      {isCreateRequestQueueValid && (
        <View className="flex flex-col space-y-2 bg-nepomuceno-dark-blue px-5 py-2">
          <Text className="font-poppinsBold text-sm text-white">
            Quantidade de requisições na fila para sincronizar: {queueLength}
          </Text>
          <CustomButton
            variant="finish"
            onPress={() => navigate('SyncSolicitante')}
          >
            Sincronizar
          </CustomButton>
        </View>
      )}
    </>
  );
}

export default RedirectToSyncScreen;
