import { useNavigation } from "@react-navigation/native";
import { Camera } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export interface Props {
  label: string;
  required?: boolean;
}

export function OpenCamera({ label, required }: Props) {
  const { navigate } = useNavigation();

  return (
    <>
      <View className="flex flex-row gap-1">
        {required ? (
          <Text className="font-poppinsBold text-sm leading-4 text-status-red">
            *
          </Text>
        ) : null}
        <Text className="font-poppinsBold text-sm leading-4 text-neutral-900">
          {label.toLocaleUpperCase()}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="m-0 flex h-32 items-center justify-center rounded-lg bg-neutral-100 font-poppinsSemibold"
        style={{
          borderWidth: 2,
          borderColor: "#E5E7EB",
          borderStyle: "dashed",
        }}
        onPress={() => navigate("camera")}
      >
        <Camera size={30} color="#1D2F99" weight="bold" />
      </TouchableOpacity>
    </>
  );
}
