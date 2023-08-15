import { Text, View } from 'react-native';
import { useFilter } from '../../contexts/filter';
import { CustomDateTimePicker } from '../ui/CustomDateTimePicker';

export function DateOptions() {
  const {
    dateSection: { startPeriod, endPeriod, setStartPeriod, setEndPeriod },
  } = useFilter();

  return (
    <>
      <Text className="mb-4 font-poppinsBold text-base">
        Selecione o período:
      </Text>
      <View className="mb-3">
        <CustomDateTimePicker
          label="De"
          mode="date"
          value={startPeriod}
          onDateSelect={setStartPeriod}
        />
      </View>
      <CustomDateTimePicker
        label="Até"
        mode="date"
        value={endPeriod}
        onDateSelect={setEndPeriod}
      />
    </>
  );
}
