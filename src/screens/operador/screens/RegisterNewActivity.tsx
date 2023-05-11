import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Header } from '../../../components/Header';
import { OrderInfoCard } from '../../../components/OrderInfoCard';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../components/ui/CustomDateTimePicker';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';

export function RegisterNewActivity() {
  const [activity, setActivity] = useState('');
  const [note, setNote] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setHours(new Date().getHours() + 1)),
  );

  return (
    <View className="flex flex-col flex-1 bg-white">
      <Header title="Adicionar nova atividade" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1">
        <OrderInfoCard />
        <View className="px-6 py-4 flex flex-1">
          <View className="mb-4">
            <Input
              required
              label="ATIVIDADE"
              onChangeText={(text) => setActivity(text)}
              value={activity}
            />
          </View>
          <View className="mb-4">
            <CustomDateTimePicker
              value={startDate}
              onDateSelect={setStartDate}
              label="Data e hora de início"
              mode="datetime"
            />
          </View>
          <View className="mb-4">
            <CustomDateTimePicker
              value={endDate}
              onDateSelect={setEndDate}
              label="Data e hora de término"
              mode="datetime"
            />
          </View>
          <View className="mb-4">
            <TextArea
              label="Observações"
              onChangeText={(text) => setNote(text)}
              value={note}
            />
          </View>
          <View className="">
            <CustomButton variant="primary">Cadastrar</CustomButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
