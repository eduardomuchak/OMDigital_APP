import { Text, View } from 'react-native';

interface CardTitleProps {
  children: React.ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
  return (
    <View className="flex-row items-center justify-center">
      <Text className="font-poppinsBold text-lg text-center text-white">{children}</Text>
    </View>
  );
}
