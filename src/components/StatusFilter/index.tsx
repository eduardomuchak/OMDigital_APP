import { Text, View, TouchableOpacity } from "react-native";
import { Funnel } from "phosphor-react-native";

interface StatusFilterProps {
  openFilterModal: () => void;
  filterTitle: string;
}

export function StatusFilter({
  openFilterModal,
  filterTitle,
}: StatusFilterProps) {
  return (
    <TouchableOpacity
      className="relative mb-5 mt-4 flex-row items-center justify-center"
      onPress={openFilterModal}
    >
      <Text className="text-neutral text-center font-poppinsBold text-lg">
        {filterTitle}
      </Text>
      <View className="absolute right-8 top-0">
        <Funnel size={26} color="#1D2F99" weight="fill" />
      </View>
    </TouchableOpacity>
  );
}
