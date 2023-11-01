import { ActivityIndicator, Text, View } from 'react-native';
import { ProgressBar } from '../ProgressBar';

export function SyncLoading({ progress }: { progress?: number }) {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(31, 41, 91)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        paddingHorizontal: 32,
      }}
    >
      <ActivityIndicator color="#F37021" size={64} className="opacity-100" />
      <Text className="text-center font-poppinsBold text-lg text-white opacity-100">
        Sincronizando dados offline com o servidor
      </Text>
      {progress && <ProgressBar progress={progress} />}
    </View>
  );
}
