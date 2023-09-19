import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Text, View } from 'react-native';
import { AttachmentPreviewModal } from '../../../../components/AttachmentPreviewModal';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { acceptRequestAPI } from '../../../../services/GET/Solicitations/acceptRequest';
import { dismissRequestAPI } from '../../../../services/GET/Solicitations/dismissRequest';
import { Solicitations } from '../../../../services/GET/Solicitations/solicitations.interface';
import { formatISOStringToPTBRDateString } from '../../../../utils/formatISOStringToPTBRDateString';
import { textCapitalizer } from '../../../../utils/textCapitalize';

interface OpenedRequestCardProps {
  request: Solicitations.Fetch;
}

export function OpenedRequestCard({ request }: OpenedRequestCardProps) {
  const queryClient = useQueryClient();

  const mutationAcceptRequest = useMutation({
    mutationFn: acceptRequestAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['listRequest'] });
    },
  });

  const mutationDismissRequest = useMutation({
    mutationFn: dismissRequestAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['listRequest'] });
    },
  });

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
          <CustomButton
            variant="cancel"
            onPress={() => {
              mutationDismissRequest.mutate(request.id);
            }}
          >
            Recusar
          </CustomButton>
        </View>
        <View className="w-[48%]">
          <CustomButton
            variant="primary"
            onPress={() => {
              mutationAcceptRequest.mutate(request.id);
            }}
          >
            Aceitar
          </CustomButton>
        </View>
      </View>
    </View>
  );
}
