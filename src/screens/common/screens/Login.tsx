import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomButton } from '../../../components/ui/CustomButton';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../../../contexts/auth';
import { LoginFormData, loginSchema } from '../../../validations/LoginScreen';
import { BackgroundCardContainer } from '../components/BackgroundCardContainer';
import { LogoAndCircles } from '../components/LogoAndCircles';

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

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <LogoAndCircles />
      <BackgroundCardContainer>
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
                value={value}
                label="USUÁRIO"
                placeholder="123.456.789-00"
                keyboardType="numeric"
                maskedInput={true}
                maskType="cpf"
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
            onPress={() => navigate('PasswordRecoverySelection')}
          >
            RECUPERE AQUI
          </Text>
        </Text>
        <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
          Entrar
        </CustomButton>
        <CustomButton
          style={{ marginTop: 10 }}
          variant="primary"
          onPress={() => navigate('RegisterNewPassword')}
        >
          Cadastrar Senha
        </CustomButton>
      </BackgroundCardContainer>
    </View>
  );
}
