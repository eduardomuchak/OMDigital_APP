import { ActivityIndicator, View } from 'react-native';

export function Loading() {
  return (
    <View className="h-screen items-center justify-center flex flex-col flex-1 gap-2">
      <ActivityIndicator color="#1D2F99" size={64} />
    </View>
  );
}
