import { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { Header } from '../../../components/Header';
import { QRCodeScannerModal } from '../../../components/QRCodeScannerModal';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../components/ui/CustomDateTimePicker';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';

export function RegisterNewMaintenanceOrder() {
  const [propertyCode, setPropertyCode] = useState('');
  const [counter, setCounter] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setHours(new Date().getHours() + 1)),
  );
  // const { location } = useGetLocation();

  // console.log(location);

  return (
    <>
      <SafeAreaView className="flex flex-col flex-1 bg-white">
        <Header title="Cadastrar Ordem de Manutenção" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex flex-1"
        >
          <View className="px-6 py-4 flex flex-1">
            <View className="mb-4 flex flex-row">
              <View className="flex flex-1">
                <Input
                  label="Código do bem"
                  onChangeText={(text) => setPropertyCode(text)}
                  value={propertyCode}
                />
              </View>
              <QRCodeScannerModal onScan={setPropertyCode} />
            </View>

            <View className="mb-4">
              <Input
                label="Contador"
                onChangeText={(text) => setCounter(text)}
                value={counter}
              />
            </View>
            <View className="mb-4">
              <CustomDateTimePicker
                value={startDate}
                onDateSelect={setStartDate}
                label="Data e hora da parada informada"
                mode="datetime"
              />
            </View>
            <View className="mb-4">
              <CustomDateTimePicker
                value={endDate}
                onDateSelect={setEndDate}
                label="Data e hora da previsão de término"
                mode="datetime"
              />
            </View>
            <View className="mb-4">
              <TextArea
                label="Motivo"
                onChangeText={(text) => setReason(text)}
                value={reason}
              />
            </View>
            <View className="">
              <CustomButton variant="primary">Cadastrar</CustomButton>
            </View>
          </View>
          <View className="h-96 mb-20"></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
