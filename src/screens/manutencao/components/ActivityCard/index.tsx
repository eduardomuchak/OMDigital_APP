import { Text, View } from 'react-native';

import { formatISOStringToPTBRDateString } from '../../../../utils/formatISOStringToPTBRDateString';

import { useQuery } from '@tanstack/react-query';
import { AttachmentPreviewModal } from '../../../../components/AttachmentPreviewModal';
import { fetchStagesStatus } from '../../../../services/GET/Status/fetchStagesStatus';
import { Stage } from '../../../../services/POST/Stages/stages.interface';

interface ActivityCardProps {
  activity: Stage.StagesList;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const isSomeDateInfoNull =
    activity.start_date === null || activity.end_date === null;
  const isSomeHourInfoNull =
    activity.start_hr === null || activity.end_hr === null;

  const listStageStatus = useQuery({
    queryKey: ['listStageStatus'],
    queryFn: fetchStagesStatus,
  });
  if (listStageStatus.data === undefined) {
    return <></>;
  }

  const foundStatus = listStageStatus.data.find(
    (status) => status.id === activity.status,
  );

  return (
    <View className="mb-2 flex flex-row rounded-xl bg-neutral-100">
      <View className="relative flex-1 p-4">
        {activity.images.length > 0 ? (
          <View className="absolute right-0 top-4 flex items-center justify-start px-4">
            <AttachmentPreviewModal
              images={activity.images}
              iconColor="#000000"
            />
          </View>
        ) : null}
        <View className="mr-8 flex flex-row justify-between">
          <View className="mb-3 flex flex-row items-start">
            <View
              style={{
                backgroundColor: foundStatus?.property,
              }}
              className="mr-2 mt-2 h-2 w-2 rounded-full"
            />
            <Text className="font-poppinsBold text-base text-neutral-900">
              {activity.description}
            </Text>
          </View>
        </View>
        <View className="flex flex-col items-start">
          <Text className="font-poppinsBold text-base text-neutral-900">
            Previsão:
          </Text>
          {isSomeDateInfoNull && isSomeHourInfoNull ? (
            <Text className="font-poppinsMedium text-sm text-neutral-900">
              Não informado
            </Text>
          ) : (
            <Text className="font-poppinsMedium text-sm text-neutral-900">
              {`${formatISOStringToPTBRDateString(
                activity.start_date + 'T' + activity.start_hr + '.000Z',
              )} às ${formatISOStringToPTBRDateString(
                activity.end_date + 'T' + activity.end_hr + '.000Z',
              )}`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
