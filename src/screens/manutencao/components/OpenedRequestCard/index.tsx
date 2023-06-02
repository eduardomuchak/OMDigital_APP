import { Text, View } from 'react-native';
import { AttachmentPreviewModal } from '../../../../components/AttachmentPreviewModal';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { formatISOStringToPTBRDateString } from '../../../../utils/formatISOStringToPTBRDateString';

interface Request {
  id: number;
  propertyCode: string;
  images: string[];
  openedDate: string;
  requester: string;
  counter: string;
  sympton: string;
}

interface OpenedRequestCardProps {
  request: Request;
}

export function OpenedRequestCard({ request }: OpenedRequestCardProps) {
  return (
    <View className="relative rounded-xl bg-neutral-100 p-4">
      {request.images.length > 0 ? (
        <View className="absolute right-4 top-4 z-50 flex items-center justify-start">
          <AttachmentPreviewModal images={request.images} iconColor="#000000" />
        </View>
      ) : null}
      <Text className="mb-2 w-[80%] font-poppinsBold text-lg">
        {request.propertyCode}
      </Text>
      <View className="space-y-3">
        <View>
          <Text className="font-poppinsBold text-sm">
            Data de Solicitação:{' '}
            <Text className="font-poppinsMedium">
              {formatISOStringToPTBRDateString(request.openedDate)}
            </Text>
          </Text>
          <Text className="font-poppinsBold text-sm">
            Solicitante:{' '}
            <Text className="font-poppinsMedium">{request.requester}</Text>
          </Text>
        </View>

        <View>
          <Text className="font-poppinsBold text-sm">Contador:</Text>
          <Text className="font-poppinsMedium">{request.counter}</Text>
        </View>

        <View>
          <Text className="font-poppinsBold text-sm">Sintoma:</Text>
          <Text className="font-poppinsMedium">{request.sympton}</Text>
        </View>
      </View>

      <View className="mt-4 flex flex-row justify-between">
        <View className="w-[48%]">
          <CustomButton variant="cancel" onPress={() => {}}>
            Recusar
          </CustomButton>
        </View>
        <View className="w-[48%]">
          <CustomButton variant="primary" onPress={() => {}}>
            Aceitar
          </CustomButton>
        </View>
      </View>
    </View>
  );
}
