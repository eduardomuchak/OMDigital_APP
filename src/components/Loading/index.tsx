import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex h-screen flex-1 flex-col items-center justify-center gap-2">
      <ActivityIndicator color="#1D2F99" size={64} />
    </View>
  );
}
