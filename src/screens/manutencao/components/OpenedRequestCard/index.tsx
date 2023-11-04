import { Alert, Text, View } from 'react-native';
import { AttachmentPreviewModal } from '../../../../components/AttachmentPreviewModal';
import { CustomButton } from '../../../../components/ui/CustomButton';
import useCheckInternetConnection from '../../../../hooks/useCheckInternetConnection';
import { Solicitations } from '../../../../services/GET/Solicitations/solicitations.interface';
import { formatISOStringToPTBRDateString } from '../../../../utils/formatISOStringToPTBRDateString';
import { textCapitalizer } from '../../../../utils/textCapitalize';
import useAcceptRequest from '../../hooks/useAcceptRequest.hook';
import useDismissRequest from '../../hooks/useDismissRequest.hook';

interface OpenedRequestCardProps {
  request: Solicitations.Fetch;
}

export function OpenedRequestCard({ request }: OpenedRequestCardProps) {
  const { acceptRequestMutation, addAccepetedRequestToQueue } =
    useAcceptRequest();
  const { dismissRequestMutation, addDismissedRequestToQueue } =
    useDismissRequest();
  const { isConnected } = useCheckInternetConnection();

  const onAcceptRequest = () => {
    if (isConnected) {
      acceptRequestMutation.mutate(request.id);
    } else {
      addAccepetedRequestToQueue(request.id);
      Alert.alert(
        'Sucesso',
        'Esta requisição foi adicionada à fila de sincronização e será sincronizada assim que houver conexão com a internet.',
      );
    }
  };

  const onDismissRequest = () => {
    if (isConnected) {
      dismissRequestMutation.mutate(request.id);
    } else {
      addDismissedRequestToQueue(request.id);
      Alert.alert(
        'Sucesso',
        'Esta requisição foi adicionada à fila de sincronização e será sincronizada assim que houver conexão com a internet.',
      );
    }
  };

  return (
    <View className="relative rounded-xl bg-neutral-100 p-4">
      {request.images.length > 0 ? (
        <View className="absolute right-4 top-4 z-50 flex items-center justify-start">
          <AttachmentPreviewModal images={request.images} iconColor="#000000" />
        </View>
      ) : null}
      <Text className="mb-2 w-full text-center font-poppinsBold text-lg">
        {request.asset_plate}
      </Text>
      <View className="space-y-3">
        <View>
          <Text className="font-poppinsBold text-sm">
            Data de Solicitação:{' '}
            <Text className="font-poppinsMedium">
              {formatISOStringToPTBRDateString(request.datetime)}
            </Text>
          </Text>
          <Text className="font-poppinsBold text-sm">
            Solicitante:{' '}
            <Text className="font-poppinsMedium">
              {textCapitalizer(request.asset_maintenance_controller)}
            </Text>
          </Text>
        </View>

        <View>
          <Text className="font-poppinsBold text-sm">Contador:</Text>
          <Text className="font-poppinsMedium">{request.counter}</Text>
        </View>

        <View>
          <Text className="font-poppinsBold text-sm">Sintoma:</Text>
          <Text className="font-poppinsMedium">{request.report}</Text>
        </View>
      </View>

      <View className="mt-4 flex flex-row justify-between">
        <View className="w-[48%]">
          <CustomButton variant="cancel" onPress={() => onDismissRequest()}>
            Recusar
          </CustomButton>
        </View>
        <View className="w-[48%]">
          <CustomButton variant="primary" onPress={() => onAcceptRequest()}>
            Aceitar
          </CustomButton>
        </View>
      </View>
    </View>
  );
}
