import { Text, View } from "react-native";
import { LogoutModal } from "../LogoutModal";
import { HeaderProps } from "./interface";
import { GoToPreviousScreen } from "../GoToPreviousScreen";

export function Header({ title, isHomeScreen }: HeaderProps) {
  return (
    <View className="flex h-28 justify-end bg-primary-500">
      {isHomeScreen ? (
        <View className="flex flex-row items-center justify-between pl-6 pr-2">
          <Text className="font-poppinsBold text-lg text-white">{title}</Text>
          <LogoutModal />
        </View>
      ) : (
        <View className="flex flex-row items-center pl-2 pr-6">
          <GoToPreviousScreen />
          <Text className="mx-auto text-center font-poppinsBold text-lg text-white">
            {title}
          </Text>
        </View>
      )}
    </View>
  );
}
