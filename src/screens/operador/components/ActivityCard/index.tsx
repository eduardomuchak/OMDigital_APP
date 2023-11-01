import { Text, View } from 'react-native';
import { formatISOStringToPTBRDateString } from '../../../../utils/formatISOStringToPTBRDateString';
import { DeleteActivityModal } from '../DeleteActivityModal';

import { useQuery } from '@tanstack/react-query';
import { HourglassHigh, HourglassLow, Pause } from 'phosphor-react-native';
import { AttachmentPreviewModal } from '../../../../components/AttachmentPreviewModal';
import { fetchStagesStatus } from '../../../../services/GET/Status/fetchStagesStatus';
import { Stage } from '../../../../services/POST/Stages/stages.interface';
import {
  formatDateToPTBR,
  removeSecondsFromTime,
} from '../../../../utils/formatDates';
import { formatMaintenanceOrderStatus } from '../../../../utils/formatMaintenanceOrderStatus';

export function ActivityCard({ stage }: Stage.StagesListProps) {
  const listStageStatus = useQuery({
    queryKey: ['listStageStatus'],
    queryFn: fetchStagesStatus,
  });

  if (listStageStatus.isLoading || listStageStatus.data === undefined) {
    return <></>;
  }

  const foundStatus = listStageStatus.data.find(
    (status) => status.id === stage.status,
  );

  const handleFinishedActivity = () => {
    if (stage.end_date) {
      const diff =
        new Date(stage.end_date).getTime() - new Date(stage.end_date).getTime();

      const diffFormatted = new Date(new Date(diff).toISOString())
        .toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })
        .toString()
        .replace(':', 'h');

      if (diff > 0) {
        return (
          <View className="flex w-full flex-row items-center justify-start space-x-2">
            <HourglassLow size={20} color="#B50202" weight="bold" />
            <Text className="break-words font-poppinsMedium text-sm">
              Atividade finalizada com{' '}
              <Text className="font-poppinsBold text-sm text-status-red">
                {diffFormatted}
              </Text>{' '}
              de atraso
            </Text>
          </View>
        );
      }
      if (diff < 0) {
        return (
          <View className="flex w-full flex-row items-center justify-start space-x-2">
            <HourglassHigh size={20} color="#046700" weight="bold" />
            <Text className="font-poppinsMedium text-sm">
              Atividade finalizada dentro do prazo
            </Text>
          </View>
        );
      }
    }
    return;
  };

  return (
    <View className="flex flex-row rounded-xl bg-neutral-100">
      <View className="relative flex-1 p-4">
        {stage.images.length > 0 ? (
          <View className="absolute right-0 top-4 flex items-center justify-start px-4">
            <AttachmentPreviewModal images={stage.images} iconColor="#000000" />
          </View>
        ) : null}
        <View className="mr-8 flex flex-row justify-between">
          <View className="mb-3 flex flex-row items-start">
            {stage.status === 3 ? (
              <View className="mr-5 mt-2 h-2 w-2">
                <Pause size={20} color="#B50202" weight="bold" />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: foundStatus?.property,
                }}
                className="mr-2 mt-2 h-2 w-2 rounded-full"
              />
            )}
            <Text className="font-poppinsBold text-base text-neutral-900">
              {stage.description}
            </Text>

            {/* {stage.description ? ( //AQUI SERIA OBSERVAÇÃO, NÃO DESCRICAO
              <View
                className={clsx("relative", {
                  "left-28": stage.images.length > 0,
                  "left-36": stage.images.length === 0,
                })}
              >
                <ObservationsModal observations={stage.obs} />
              </View>
            ) : null} */}
          </View>
        </View>

        <View className="flex flex-row items-center space-x-1">
          <Text className="block font-poppinsBold text-base text-neutral-900">
            Status:
          </Text>
          <Text className="block font-poppinsMedium text-sm text-neutral-900">
            {foundStatus?.description}
          </Text>
        </View>
        {stage.obs && (
          <View className="flex flex-col items-start">
            <Text className="font-poppinsBold text-base text-neutral-900">
              Observação:
            </Text>
            <Text className="font-poppinsMedium text-sm text-neutral-900">
              {stage.obs}
            </Text>
          </View>
        )}

        <View className="flex flex-col items-start">
          <Text className="font-poppinsBold text-base text-neutral-900">
            Previsão:
          </Text>
          <Text className="font-poppinsMedium text-sm text-neutral-900">
            {stage.start_prev_date
              ? `Início: ${formatDateToPTBR(
                  stage.start_prev_date,
                )} - ${removeSecondsFromTime(stage.start_prev_hr)}`
              : 'Início: Não informado'}
          </Text>
          <Text className="font-poppinsMedium text-sm text-neutral-900">
            {stage.end_prev_date
              ? `Fim: ${formatDateToPTBR(
                  stage.end_prev_date,
                )} - ${removeSecondsFromTime(stage.end_prev_hr)}`
              : 'Fim: Não informado'}
          </Text>
        </View>

        {formatMaintenanceOrderStatus(stage.status) === 'Finalizada' &&
        stage.end_date ? (
          <>
            <View className="mt-3 flex flex-col items-start">
              <Text className="font-poppinsBold text-base text-neutral-900">
                Finalizado em:
              </Text>
              <Text className="font-poppinsMedium text-sm text-neutral-900">
                {`${formatISOStringToPTBRDateString(stage.end_date)}`}
              </Text>
            </View>
            <View className="mt-3 items-start">{handleFinishedActivity()}</View>
          </>
        ) : null}
      </View>

      <DeleteActivityModal activityId={stage.id} />
    </View>
  );
}
