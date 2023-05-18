import { Text, View } from "react-native";

interface CardTitleProps {
  children: React.ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
  return (
    <View className="flex-row items-center justify-center">
      <Text className="text-center font-poppinsBold text-lg text-white">
        {children}
      </Text>
    </View>
  );
}
