import { Pressable, View } from "react-native";

import { CardInfo } from "./CardInfo";
import { CardTitle } from "./CardTitle";

import clsx from "clsx";

interface OMCardProps {
  onPress?: () => void;
  id: number;
  codigoBem: string;
  ordemManutencao: string;
  operacao: number;
  paradaReal: string;
  prevFim: string;
  isFinishOrCancel?: boolean;
  status?: string;
  tipo: string;
}

export function OMCard(props: OMCardProps) {
  return (
    <Pressable onPress={props.onPress} className="items-center">
      <View
        className={clsx(
          "w-full max-w-lg justify-center rounded-xl bg-status-green p-5",
          {
            ["bg-status-red"]: props.status === "Não aprovada",
            ["bg-red-500"]: props.status === "Recusada",
            ["bg-cyan-500"]: props.status === "Parada futura",
            ["bg-status-yellow"]: props.status === "Aguardando início",
            ["bg-emerald-500"]: props.status === "Em andamento",
            ["bg-blue-500"]: props.status === "Atividade concluída",
            ["border-2 border-status-green bg-status-concluido"]:
              props.status === "Finalizada",
            ["border-2 border-status-red bg-status-cancelado"]:
              props.status === "Cancelada",
          }
        )}
      >
        <CardTitle status={props.status}>{props.codigoBem}</CardTitle>
        <CardInfo
          codigoBem={props.codigoBem}
          ordemManutencao={props.ordemManutencao}
          operacao={props.operacao}
          paradaReal={props.paradaReal}
          prevFim={props.prevFim}
          tipo={props.tipo}
          isFinishOrCancel={props.isFinishOrCancel}
        />
      </View>
    </Pressable>
  );
}
