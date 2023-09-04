import { ActivityIndicator, Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

export function SyncLoading() {
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      className="flex h-screen flex-1 flex-col items-center justify-center gap-5 px-5"
    >
      <ActivityIndicator color="#1F295B" size={64} />
      <Text className="font-poppinsBold text-xl text-zinc-900">
        Sincronizando informações com banco de dados remoto...
      </Text>
    </Animated.View>
  );
}
