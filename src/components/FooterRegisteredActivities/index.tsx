import { Text, View } from "react-native";

interface FooterRegisteredActivitiesProps {
  controladorInfo: {
    localDeManutencao: string;
    controlador: string;
    telefone: string;
  };
}

export function FooterRegisteredActivities({
  controladorInfo,
}: FooterRegisteredActivitiesProps) {
  return (
    <View className="bg-primary-500 px-6 py-5">
      <View className="mb-2">
        <Text className="font-poppinsBold text-lg text-white">
          {controladorInfo.localDeManutencao}:
        </Text>
        <Text className="font-poppinsMedium text-base text-white">
          {controladorInfo.localDeManutencao}:
        </Text>
      </View>
      <View>
        <Text className="font-poppinsBold text-lg text-white">
          Controlador:
        </Text>
        <Text className="font-poppinsMedium text-base text-white">
          {controladorInfo.controlador} - {controladorInfo.telefone}
        </Text>
      </View>
    </View>
  );
}
