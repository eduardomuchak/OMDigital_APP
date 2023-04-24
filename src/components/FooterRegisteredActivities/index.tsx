import { Text, View } from 'react-native';

export function FooterRegisteredActivities() {
  return (
    <View className="bg-primary-500 py-5 px-6">
      <View className="mb-2">
        <Text className="font-poppinsBold text-lg text-white">Local de Manutenção:</Text>
        <Text className="font-poppinsMedium text-base text-white">Matriz Lavras:</Text>
      </View>
      <View>
        <Text className="font-poppinsBold text-lg text-white">Controlador:</Text>
        <Text className="font-poppinsMedium text-base text-white">Marcos - (99) 9 9191-9191</Text>
      </View>
    </View>
  );
}
