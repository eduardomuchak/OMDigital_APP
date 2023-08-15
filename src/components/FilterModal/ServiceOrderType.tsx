import { Text, View } from 'react-native';
import { useFilter } from '../../contexts/filter';
import { Select } from '../ui/Select';

export function ServiceOrderType() {
  const {
    selectedServiceOrderType,
    setSelectedServiceOrderType,
    serviceOrderTypeOptions,
  } = useFilter();

  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppinsBold text-base">Tipo da OS:</Text>
      <Select
        selected={selectedServiceOrderType}
        setSelected={setSelectedServiceOrderType}
        options={serviceOrderTypeOptions.sort((a, b) => a.localeCompare(b))}
      />
    </View>
  );
}
