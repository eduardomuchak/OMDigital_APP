import { useNavigation } from '@react-navigation/native';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { useState } from 'react';
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../components/ui/CustomButton';
import { Input } from '../components/ui/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import circles from '../assets/circles.png';
import logo from '../assets/logo/logo.png';
import { ErrorText } from '../components/ui/ErrorText';
import { useAuth } from '../contexts/auth';
import { regexCPF } from '../utils/validateCPF';
import { LoginFormData, loginSchema } from '../validations/LoginScreen';

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { navigate } = useNavigation();
  const { signIn } = useAuth();
  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    defaultValues: {
      userCPF: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    signIn(data);
  };

  const togglePasswordVisibility = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <View className="flex-1">
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
      </View>
      <View className="bg-white px-6 py-8 h-fit rounded-t-xl">
        <Text className="font-poppinsBold text-base text-center mb-5">
          Entre com seu usuário e senha
        </Text>

        <View className="mb-3">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={regexCPF(value)}
                label="USUÁRIO"
                placeholder="Digite o CPF"
                maxLength={11}
              />
            )}
            name="userCPF"
          />
          {formState.errors.userCPF?.message ? (
            <ErrorText>{formState.errors.userCPF?.message}</ErrorText>
          ) : null}
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-2">
              <Input
                label="SENHA"
                placeholder="Senha"
                secureTextEntry={isPasswordVisible ? false : true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={20}
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
              {formState.errors.password?.message ? (
                <ErrorText>{formState.errors.password?.message}</ErrorText>
              ) : null}
            </View>
          )}
          name="password"
        />

        <Text className="font-poppinsSemibold text-xs mb-5">
          ESQUECEU SUA SENHA?{' '}
          <Text
            className="font-poppinsSemibold text-primary-500 underline"
            onPress={() => navigate('PasswordRecovery')}
          >
            RECUPERE AQUI
          </Text>
        </Text>
        <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
          Entrar
        </CustomButton>
      </View>
    </View>
  );
}
