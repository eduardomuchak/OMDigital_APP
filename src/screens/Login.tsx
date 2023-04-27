import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/ui/Input';
import { CustomButton } from '../components/ui/CustomButton';
import { Eye, EyeSlash } from 'phosphor-react-native';

import circles from '../assets/circles.png';
import logo from '../assets/logo/logo.png';
import { useAuth } from '../contexts/auth';

export function Login() {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCpf = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setCpf(event.nativeEvent.text);
  };

  const handlePassword = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPassword(event.nativeEvent.text);
  };

  const togglePasswordVisibility = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <View className="absolute top-0">
        <Image source={circles} />
      </View>
      <View className="flex-1 items-center justify-end py-8">
        <Text className="font-poppinsBold text-white text-6xl text-center py-5 mt-10">
          OM Digital
        </Text>
      </View>
      <View className="h-32 items-center justify-end py-8">
        <Image source={logo} />
      </View>
      <View className="bg-white px-6 py-8 flex-1 rounded-t-xl">
        <Text className="font-poppinsBold text-base text-center mb-5">
          Entre com seu usuário e senha
        </Text>

        <View className="mb-3">
          <Input label="USUÁRIO" placeholder="Digite o CPF" value={cpf} onChange={handleCpf} />
        </View>

        <View className="mb-2">
          <Input
            label="SENHA"
            placeholder="Senha"
            secureTextEntry={isPasswordVisible ? false : true}
            value={password}
            onChange={(event) => handlePassword(event)}
          />
          <TouchableOpacity
            className="absolute right-3 top-8"
            onPress={(event) => togglePasswordVisibility(event)}
          >
            {isPasswordVisible ? (
              <EyeSlash size={24} color="#000000" weight="bold" />
            ) : (
              <Eye size={24} color="#000000" weight="bold" />
            )}
          </TouchableOpacity>
        </View>
        <Text className="font-poppinsSemibold text-xs mb-5">
          ESQUECEU SUA SENHA?{' '}
          <Text
            className="font-poppinsSemibold text-primary-500 underline"
            onPress={() => navigate('PasswordRecovery')}
          >
            RECUPERE AQUI
          </Text>
        </Text>
        <CustomButton variant="primary" onPress={() => signIn({ userCPF: cpf, password })}>
          Entrar
        </CustomButton>
      </View>
    </View>
  );
}
