import { Text, View } from "react-native";

import clsx from "clsx";
import { formatISOStringToPTBRDateString } from "../../utils/formatISOStringToPTBRDateString";

interface CardInfoProps {
  isFinishOrCancel?: boolean;
  codigoBem: string;
  ordemManutencao: string;
  operacao: string;
  paradaReal: string;
  prevFim: string;
}

export function CardInfo(props: CardInfoProps) {
  return (
    <>
      <Text
        className={clsx("font-poppinsMedium text-base text-white", {
          ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
        })}
      >
        {props.ordemManutencao}
      </Text>
      <Text
        className={clsx("font-poppinsMedium text-base text-white", {
          ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
        })}
      >
        {props.operacao}
      </Text>
      <View className="flex-row justify-between">
        <Text
          className={clsx("font-poppinsMedium text-base text-white", {
            ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
          })}
        >
          Par. Real:{" "}
        </Text>
        <Text
          className={clsx("font-poppinsMedium text-base text-white", {
            ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
          })}
        >
          {formatISOStringToPTBRDateString(props.paradaReal)}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text
          className={clsx("flex-row font-poppinsMedium text-base text-white", {
            ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
          })}
        >
          Prev. Fim:{" "}
        </Text>
        <Text
          className={clsx("font-poppinsMedium text-base text-white", {
            ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
          })}
        >
          {formatISOStringToPTBRDateString(props.prevFim)}
        </Text>
      </View>
    </>
  );
}
