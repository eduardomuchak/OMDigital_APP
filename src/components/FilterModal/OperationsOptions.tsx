import { Text, View } from 'react-native';
import { useFilter } from '../../contexts/OperadorFilter';
import { MultipleSelect } from '../ui/MultipleSelect';

export function OperationsOptions() {
  const {
    multipleSelectOperationOptions,
    selectedOperations,
    setSelectedOperations,
  } = useFilter();

  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppinsBold text-base">Operações:</Text>
      <MultipleSelect
        options={multipleSelectOperationOptions}
        selected={selectedOperations}
        setSelected={setSelectedOperations}
      />
    </View>
  );
}
