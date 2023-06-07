import { Dispatch, SetStateAction } from 'react';
import { Text, View } from 'react-native';

import { CustomDateTimePicker } from '../../../../components/ui/CustomDateTimePicker';

interface DateFilterOptionsProps {
  startPeriod: Date;
  endPeriod: Date;
  setStartPeriod: Dispatch<SetStateAction<Date>>;
  setEndPeriod: Dispatch<SetStateAction<Date>>;
}

export function DateFilterOptions({
  startPeriod,
  endPeriod,
  setStartPeriod,
  setEndPeriod,
}: DateFilterOptionsProps) {
  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppinsBold text-base">
        Selecione o período:
      </Text>
      <View className="mb-3">
        <CustomDateTimePicker
          label="De"
          mode="date"
          value={startPeriod!}
          onDateSelect={setStartPeriod!}
        />
      </View>
      <CustomDateTimePicker
        label="Até"
        mode="date"
        value={endPeriod!}
        onDateSelect={setEndPeriod!}
      />
    </View>
  );
}
