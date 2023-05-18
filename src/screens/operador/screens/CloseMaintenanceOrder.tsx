import { useState } from "react";
import { View } from "react-native";
import { Header } from "../../../components/Header";
import { CustomDateTimePicker } from "../../../components/ui/CustomDateTimePicker";
import { Input } from "../../../components/ui/Input";
import { CloseMaintenanceOrderCardInfo } from "../components/CloseMaintenanceOrderCardInfo";
import { FinishMaintenanceOrderModal } from "../components/FinishMaintenanceOrderModal";

export function CloseMaintenanceOrder() {
  const [counter, setCounter] = useState<string>("");
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title={"Encerrar Ordem de Manutenção"} />
      <CloseMaintenanceOrderCardInfo />
      <View className="px-6">
        <View className="mb-4">
          <Input
            label="Contador"
            onChangeText={(text) => setCounter(text)}
            value={counter}
          />
        </View>
        <View className="mb-7">
          <CustomDateTimePicker
            value={endDate}
            onDateSelect={setEndDate}
            label="Data e hora da finalização"
            mode="datetime"
          />
        </View>
        <FinishMaintenanceOrderModal />
      </View>
    </View>
  );
}
