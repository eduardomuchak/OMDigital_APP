import clsx from "clsx";
import { Text, View } from "react-native";
import { formatISOStringToPTBRDateString } from "../../../../utils/formatISOStringToPTBRDateString";
import { DeleteActivityModal } from "../DeleteActivityModal";

import { HourglassHigh, HourglassLow } from "phosphor-react-native";
import { AttachmentPreviewModal } from "../../../../components/AttachmentPreviewModal";
import { OM } from "../../../../interfaces/om-context.interface";

export function ActivityCard({ activity }: OM.ActivityProps) {
  const handleFinishedActivity = () => {
    if (activity.dataFimReal) {
      const diff =
        new Date(activity.dataFimReal).getTime() -
        new Date(activity.dataFimPrevista).getTime();

      const diffFormatted = new Date(new Date(diff).toISOString())
        .toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
        .toString()
        .replace(":", "h");

      if (diff > 0) {
        return (
          <View className="flex w-full flex-row items-center justify-start space-x-2">
            <HourglassLow size={20} color="#B50202" weight="bold" />
            <Text className="break-words font-poppinsMedium text-sm">
              Atividade finalizada com{" "}
              <Text className="font-poppinsBold text-sm text-status-red">
                {diffFormatted}
              </Text>{" "}
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
              Atividade finalizada com{" "}
              <Text className="font-poppinsBold text-sm text-status-green">
                {diffFormatted}
              </Text>{" "}
              de antecedência
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
              className={clsx("mr-2 mt-2 h-2 w-2 rounded-full", {
                "bg-status-green": activity.status === "Concluída",
                "bg-status-yellow": activity.status === "Em andamento",
                "bg-status-red": activity.status === "Atrasada",
                "bg-status-blue": activity.status === "Não iniciada",
              })}
            />
            <Text className="font-poppinsBold text-base text-neutral-900">
              {activity.descricao}
            </Text>
          </View>
        </View>
        <View className="flex flex-col items-start">
          <Text className="font-poppinsBold text-base text-neutral-900">
            Previsão:
          </Text>
          <Text className="font-poppinsMedium text-sm text-neutral-900">
            {`Início: ${formatISOStringToPTBRDateString(
              activity.dataInicioPrevista
            )}`}
          </Text>
          <Text className="font-poppinsMedium text-sm text-neutral-900">
            {`Fim: ${formatISOStringToPTBRDateString(
              activity.dataFimPrevista
            )}`}
          </Text>
        </View>
        {activity.status === "Concluída" && activity.dataFimReal ? (
          <>
            <View className="mt-3 flex flex-col items-start">
              <Text className="font-poppinsBold text-base text-neutral-900">
                Finalizado em:
              </Text>
              <Text className="font-poppinsMedium text-sm text-neutral-900">
                {`${formatISOStringToPTBRDateString(activity.dataFimReal)}`}
              </Text>
            </View>
            <View className="mt-3 items-start">{handleFinishedActivity()}</View>
          </>
        ) : null}
      </View>
      <DeleteActivityModal activityId={activity.id} />
    </View>
  );
}
