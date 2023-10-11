import { ActivityIndicator, Text, View } from 'react-native';

export function SyncLoading() {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 50,
        backgroundColor: 'rgba(31, 41, 91,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <ActivityIndicator color="#F37021" size={64} className="opacity-100" />
      <Text className="text-center font-poppinsBold text-lg text-white opacity-100">
        Atualizando dados
      </Text>
    </View>
  );
}
