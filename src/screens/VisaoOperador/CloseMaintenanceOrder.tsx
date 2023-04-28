import { SafeAreaView, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/ui/Input';
import { CustomDateTimePicker } from '../../components/ui/CustomDateTimePicker';
import { useState } from 'react';
import { CustomButton } from '../../components/ui/CustomButton';
import { FinishMaintenanceOrderModal } from './components/FinishMaintenanceOrderModal';

export function CloseMaintenanceOrder() {
  const [counter, setCounter] = useState<string>('');
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <SafeAreaView className="flex-1 flex flex-col bg-white">
      <Header title={'Encerrar Ordem de Manutenção'} />
      <View className="bg-neutral-100 px-6 py-5 mb-5">
        <View className="flex mb-2">
          <Text className="font-poppinsBold text-lg">Encerramento de Solicitação:</Text>
          <Text className="font-poppinsMedium text-base">OM12345 - O S034567</Text>
        </View>
        <View className="flex mb-2">
          <Text className="font-poppinsBold text-lg">Par. Real:</Text>
          <Text className="font-poppinsMedium text-base">06/01/2023 - 08h57</Text>
        </View>
        <View className="flex">
          <Text className="font-poppinsBold text-lg">Placa:</Text>
          <Text className="font-poppinsMedium text-base">GKY-7G22</Text>
        </View>
      </View>
      <View className="px-6">
        <View className="mb-4">
          <Input label="Contador" onChangeText={(text) => setCounter(text)} value={counter} />
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
    </SafeAreaView>
  );
}
