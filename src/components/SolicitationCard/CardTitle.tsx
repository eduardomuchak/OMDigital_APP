import { Text, View } from 'react-native';

interface CardTitleProps {
  children: React.ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
  return (
    <View className="flex-row items-center gap-1 justify-center -mt-6">
      <Text className="font-poppinsBold text-lg text-center text-white">{children}</Text>
    </View>
  );
}
