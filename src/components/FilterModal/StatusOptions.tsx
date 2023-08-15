import { Text, View } from 'react-native';
import { useFilter } from '../../contexts/filter';
import { Checkbox } from '../ui/Checkbox';

export function StatusOptions() {
  const { allStatus, handleToggleCheckbox } = useFilter();

  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppinsBold text-base">Status:</Text>
      {allStatus.map((status) => (
        <Checkbox
          key={status.id}
          title={status.description}
          onPress={() => handleToggleCheckbox(status.id, allStatus)}
          checked={status.isChecked}
        />
      ))}
    </View>
  );
}
