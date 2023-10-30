import { Text, View } from 'react-native';

export function NetworkStatus() {
  return (
    <View className="flex h-fit w-full items-center justify-center bg-alert-red px-4 py-2">
      <Text className="font-poppinsBold text-white">
        Atenção! Você está offline
      </Text>
      <Text className="font-poppinsSemibold text-white">
        Os dados enviados serão armazenados e enviados quando a conexão for
        restabelecida.
      </Text>
    </View>
  );
}
