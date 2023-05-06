import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomDateTimePickerProps } from './interface';
import { Calendar, Clock } from 'phosphor-react-native';

export function CustomDateTimePicker({
  label,
  onDateSelect,
  value,
  required,
  mode,
}: CustomDateTimePickerProps) {
  const iconColor = '#000000';

  const onChange = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    if (currentDate) {
      onDateSelect(currentDate);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: value,
      onChange,
      mode: currentMode,
      is24Hour: true,
      display: 'default',
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <>
      <View className="flex flex-row gap-1">
        {required ? (
          <Text className="font-poppinsBold text-sm leading-4 text-status-red">*</Text>
        ) : null}
        <Text className="font-poppinsBold text-sm leading-4 text-neutral-900">
          {label.toLocaleUpperCase()}
        </Text>
      </View>
      {mode === 'datetime' ? (
        <View className="flex flex-row gap-4">
          <TouchableOpacity
            className="bg-neutral-100 px-5 py-2 rounded-lg h-14 flex flex-1 items-center justify-between flex-row"
            onPress={showDatepicker}
            activeOpacity={0.7}
          >
            <Text className="font-poppinsSemibold">
              {value.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </Text>
            <Calendar size={24} color={iconColor} weight="regular" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-neutral-100 px-5 py-2 rounded-lg h-14 flex flex-1 items-center justify-between flex-row"
            onPress={showTimepicker}
            activeOpacity={0.7}
          >
            <Text className="font-poppinsSemibold">
              {value.toLocaleString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Clock size={24} color={iconColor} weight="regular" />
          </TouchableOpacity>
        </View>
      ) : null}
      {mode === 'date' ? (
        <View className="flex flex-row gap-4">
          <TouchableOpacity
            className="bg-neutral-100 px-5 py-2 rounded-lg h-14 flex flex-1 items-center justify-between flex-row"
            onPress={showDatepicker}
            activeOpacity={0.7}
          >
            <Text className="font-poppinsSemibold">
              {value.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </Text>
            <Calendar size={24} color={iconColor} weight="regular" />
          </TouchableOpacity>
        </View>
      ) : null}
      {mode === 'time' ? (
        <View className="flex flex-row gap-4">
          <TouchableOpacity
            className="bg-neutral-100 px-5 py-2 rounded-lg h-14 flex flex-1 items-center justify-between flex-row"
            onPress={showTimepicker}
            activeOpacity={0.7}
          >
            <Text className="font-poppinsSemibold">
              {value.toLocaleString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Clock size={24} color={iconColor} weight="regular" />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}
