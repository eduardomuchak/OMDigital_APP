import { Text, View } from "react-native";

import clsx from "clsx";
import { formatISOStringToPTBRDateString } from "../../utils/formatISOStringToPTBRDateString";

interface CardInfoProps {
  isFinishOrCancel?: boolean;
  codigoBem: string;
  ordemManutencao: string;
  operacao: number;
  paradaReal: string;
  prevFim: string;
  tipo: string;
}

export function CardInfo(props: CardInfoProps) {
  return (
    <>
      <Text
        className={clsx("font-poppinsMedium text-base text-white", {
          ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
        })}
      >
        OM: {props.ordemManutencao}
      </Text>
      <Text
        className={clsx("font-poppinsMedium text-base text-white", {
          ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
        })}
      >
        Operação: {props.operacao}
      </Text>
      <Text
        className={clsx("font-poppinsMedium text-base text-white", {
          ["font-poppinsMedium text-neutral-900"]: props.isFinishOrCancel,
        })}
      >
        {`Tipo: ${props.tipo.charAt(0).toUpperCase() + props.tipo.slice(1)}`}
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
