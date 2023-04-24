import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/ui/Input';
import { CustomButton } from '../components/ui/CustomButton';
import { GoToPreviousScreen } from '../components/GoToPreviousScreen';

import circles from '../assets/circles.png';

export function PasswordRecovery() {
  const { navigate } = useNavigation();
  const [cpf, setCpf] = useState('');

  return (
    <View className="flex-1 bg-primary-800">
      <View className="absolute top-0">
        <Image source={circles} />
      </View>
      <TouchableOpacity className="absolute top-10 z-50">
        <GoToPreviousScreen />
      </TouchableOpacity>
      <View className="flex-1 items-center justify-center">
        <Text className="font-poppinsBold text-white text-6xl text-center py-5 mt-10">
          OM Digital
        </Text>
      </View>
      <View className="bg-white px-6 py-8 flex-1 rounded-t-xl">
        <Text className="font-poppinsBold text-base text-center mb-5">Recuperar senha</Text>

        <View className="mb-5">
          <Input
            label="USUÁRIO"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
              setCpf(event.nativeEvent.text);
            }}
          />
        </View>
        <CustomButton variant="primary" onPress={() => navigate('OM')}>
          Recuperar Senha
        </CustomButton>
      </View>
    </View>
  );
}
