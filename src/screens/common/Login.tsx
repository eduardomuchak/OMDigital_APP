import { useNavigation } from '@react-navigation/native';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomButton } from '../../components/ui/CustomButton';
import { Input } from '../../components/ui/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import circles from '../../assets/circles-full.png';
import logo from '../../assets/logo/logo.png';
import { ErrorText } from '../../components/ui/ErrorText';
import { useAuth } from '../../contexts/auth';
import { regexCPF } from '../../utils/validateCPF';
import { LoginFormData, loginSchema } from '../../validations/LoginScreen';

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { navigate } = useNavigation();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
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

  const screenWidth = Dimensions.get('window').width;

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      {/* Circle, logo e título */}
      <View className="relative flex-1 items-center justify-center">
        <Image
          className={clsx('absolute', {
            '-right-52 -top-52': true,
          })}
          source={circles}
          style={{
            resizeMode: 'stretch',
            transform: [
              {
                scale: screenWidth > 500 ? 2.5 : 1,
              },
            ],
          }}
        />
        <Text
          className={clsx(
            'mt-10 py-5 text-center font-poppinsBold  text-white',
            {
              'text-6xl': screenWidth < 500,
              'text-8xl': screenWidth > 500,
            },
          )}
        >
          OM Digital
        </Text>
        <Image
          source={logo}
          className={clsx('absolute', {
            'bottom-4': screenWidth < 500,
            'bottom-14': screenWidth > 500,
          })}
          style={{
            transform: [
              {
                scale: screenWidth > 500 ? 1.5 : 1,
              },
            ],
          }}
        />
      </View>

      {/* Card */}
      <View
        className={clsx('h-fit  bg-white ', {
          'rounded-t-xl px-6 py-8': screenWidth < 500,
          'mx-16 mb-8 rounded-xl p-10': screenWidth > 500,
        })}
      >
        <Text className="mb-5 text-center font-poppinsBold text-base">
          Entre com seu usuário e senha
        </Text>

        <View className="mb-3">
          <Controller
            control={control}
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
          {errors.userCPF?.message ? (
            <ErrorText>{errors.userCPF?.message}</ErrorText>
          ) : null}
        </View>
        <Controller
          control={control}
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
              {errors.password?.message ? (
                <ErrorText>{errors.password?.message}</ErrorText>
              ) : null}
            </View>
          )}
          name="password"
        />

        <Text className="mb-5 font-poppinsSemibold text-xs">
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
        {/* <CustomButton variant="primary" onPress={() => navigate('camera')}>
          Camera
        </CustomButton> */}
      </View>
    </View>
  );
}
