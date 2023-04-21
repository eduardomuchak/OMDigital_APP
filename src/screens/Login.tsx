import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { useState } from 'react';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { Input } from '../components/ui/Input';
import { CustomButton } from '../components/ui/CustomButton';
import { Eye, EyeSlash } from 'phosphor-react-native';

type LoginScreenNavigationProp = NavigationProp<ReactNavigation.RootParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<ReactNavigation.RootParamList, 'Login'>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

export function Login({ navigation }: LoginProps) {
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

  const handleLogin = () => {
    console.log(cpf, password);
    navigation.navigate('OM');
  };

  return (
    <View className="flex-1 p-6 bg-white justify-center">
      <Text className="font-poppinsBold text-primary-500 text-5xl text-center py-5">
        OM Digital
      </Text>
      <Text className="font-poppinsBold text-base text-center mb-5">Entre com seu cpf e senha</Text>
      <View className="gap-7">
        <View>
          <Input label="USUÁRIO" placeholder="Digite o CPF" value={cpf} onChange={handleCpf} />
        </View>

        <View>
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

        <Text className="font-poppinsSemibold text-[10px]">
          ESQUECEU SUA SENHA?{' '}
          <Text
            className="font-poppinsSemibold text-primary-500 underline"
            onPress={() => navigation.navigate('Home')}
          >
            RECUPERE AQUI
          </Text>
        </Text>
        <CustomButton variant="primary" onPress={handleLogin}>
          Entrar
        </CustomButton>
      </View>
    </View>
  );
}
