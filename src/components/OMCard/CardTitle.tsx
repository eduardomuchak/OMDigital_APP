import { CheckCircle, WarningCircle } from "phosphor-react-native";
import { Text, View } from "react-native";

import clsx from "clsx";

interface CardTitleProps {
  children: React.ReactNode;
  status?: string;
}

export function CardTitle({ children, status }: CardTitleProps) {
  return (
    <View className="mb-2 flex-row items-center justify-center">
      {status === "Concluída" && (
        <CheckCircle
          color="#046700"
          weight="bold"
          size={18}
          style={{ marginRight: 8, marginBottom: 4 }}
        />
      )}
      {status === "Cancelada" && (
        <WarningCircle
          color="#B50202"
          weight="bold"
          size={18}
          style={{ marginRight: 8, marginBottom: 4 }}
        />
      )}
      <Text
        className={clsx("text-center font-poppinsBold text-lg text-white", {
          ["mr-4 text-neutral-900"]:
            status === "Concluída" || status === "Cancelada",
        })}
      >
        {children}
      </Text>
    </View>
  );
}
