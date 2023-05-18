import clsx from "clsx";
import { Image } from "phosphor-react-native";
import { Text, View } from "react-native";
import { formatISOStringToPTBRDateString } from "../../../../utils/formatISOStringToPTBRDateString";
import { DeleteActivityModal } from "../DeleteActivityModal";

import { OM } from "../../../../interfaces/om-context.interface";

export function ActivityCard({ activity }: OM.ActivityProps) {
  return (
    <View className="flex flex-row rounded-xl bg-neutral-100">
      <View className="relative flex-1 p-4">
        {activity.images ? (
          <View className="absolute right-0 top-4 flex items-center justify-start px-4">
            <Image size={24} weight="bold" color="#000000" />
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
            {`${formatISOStringToPTBRDateString(
              activity.dataInicioPrevista
            )} às ${formatISOStringToPTBRDateString(activity.dataFimPrevista)}`}
          </Text>
        </View>
      </View>
      <DeleteActivityModal />
    </View>
  );
}
