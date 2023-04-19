import { ActivityIndicator, Text, View } from 'react-native';

function Loading() {
  return (
    <View className="h-screen items-center justify-center flex flex-col flex-1 gap-2">
      <ActivityIndicator color="#556AEB" size={30} />
      <Text className="font-poppinsBold text-xl">Carregando</Text>
    </View>
  );
}

export default Loading;
