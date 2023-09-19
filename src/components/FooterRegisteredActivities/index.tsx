import { Text, View } from 'react-native';
import { textCapitalizer } from '../../utils/textCapitalize';

interface FooterRegisteredActivitiesProps {
  controladorInfo: {
    localDeManutencao: string;
    controlador: string;
    telefone: string | null;
  };
}

export function FooterRegisteredActivities({
  controladorInfo,
}: FooterRegisteredActivitiesProps) {
  return (
    <View className="bg-nepomuceno-dark-blue px-6 py-5">
      <View className="mb-2">
        <Text className="font-poppinsBold text-lg text-white">
          Local de Manutenção:
        </Text>
        <Text className="font-poppinsMedium text-base text-white">
          {textCapitalizer(controladorInfo.localDeManutencao)}
        </Text>
      </View>
      <View>
        <Text className="font-poppinsBold text-lg text-white">
          Controlador:
        </Text>
        <Text className="font-poppinsMedium text-base text-white">
          {textCapitalizer(controladorInfo.controlador)}
          {controladorInfo.telefone !== null
            ? ` - ${controladorInfo.telefone}`
            : ''}
        </Text>
      </View>
    </View>
  );
}
