import { Text, View } from 'react-native';
import { useFilter } from '../../contexts/OperadorFilter';
import { MultipleSelect } from '../ui/MultipleSelect';

export function StatusOptions() {
  const { multipleSelectStatusOptions, selectedStatus, setSelectedStatus } =
    useFilter();

  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppinsBold text-base">Status:</Text>
      <MultipleSelect
        options={multipleSelectStatusOptions}
        selected={selectedStatus}
        setSelected={setSelectedStatus}
      />
    </View>
  );
}
