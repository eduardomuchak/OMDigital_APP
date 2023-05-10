import { Text, View } from "react-native";

import { Image } from "phosphor-react-native";
import { formatISOStringToPTBRDateString } from "../../../../utils/formatISOStringToPTBRDateString";

import clsx from "clsx";

import { OM } from "../../../../interfaces/om-context.interface";

export function ActivityCard({ activity }: OM.ActivityProps) {
  return (
    <View className="bg-neutral-100 rounded-xl flex flex-row mb-2">
      <View className="flex-1 p-4 relative">
        {activity.images ? (
          <View className="flex items-center justify-start px-4 absolute top-4 right-0">
            <Image size={24} weight="bold" color="#000000" />
          </View>
        ) : null}
        <View className="flex flex-row justify-between mr-8">
          <View className="flex flex-row items-start mb-3">
            <View
              className={clsx("w-2 h-2 rounded-full mr-2 mt-2", {
                "bg-status-green": activity.status === "Concluída",
                "bg-status-yellow": activity.status === "Em andamento",
                "bg-status-red": activity.status === "Atrasada",
                "bg-status-blue": activity.status === "Não iniciada",
              })}
            />
            <Text className="text-base font-poppinsBold text-neutral-900">
              {activity.descricao}
            </Text>
          </View>
        </View>
        <View className="flex flex-col items-start">
          <Text className="text-base font-poppinsBold text-neutral-900">
            Previsão:
          </Text>
          <Text className="text-sm font-poppinsMedium text-neutral-900">
            {`${formatISOStringToPTBRDateString(
              activity.dataInicioPrevista
            )} às ${formatISOStringToPTBRDateString(activity.dataFimPrevista)}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
