import { Text, View } from 'react-native';
import { LogoutModal } from '../LogoutModal';
import { HeaderProps } from './interface';
import { GoToPreviousScreen } from '../GoToPreviousScreen';

export function Header({ title, isHomeScreen }: HeaderProps) {
  return (
    <View className="bg-primary-500 h-32 flex justify-end">
      {isHomeScreen ? (
        <View className="flex items-center justify-between flex-row pl-6 pr-2">
          <Text className="text-white font-poppinsBold text-lg">{title}</Text>
          <LogoutModal />
        </View>
      ) : (
        <View className="flex items-center flex-row pl-2 pr-6">
          <GoToPreviousScreen />
          <Text className="text-white font-poppinsBold text-center text-lg mx-auto">{title}</Text>
        </View>
      )}
    </View>
  );
}
