import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { GoToPreviousScreen } from '../components/GoToPreviousScreen';
import { CustomButton } from '../components/ui/CustomButton';
import { Input } from '../components/ui/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import circles from '../assets/circles.png';
import logo from '../assets/logo/logo.png';
import { ErrorText } from '../components/ui/ErrorText';
import { regexCPF } from '../utils/validateCPF';
import {
  PasswordRecoveryFormData,
  passwordRecoverySchema,
} from '../validations/PasswordRecoveryScreen';

export function PasswordRecovery() {
  const { navigate } = useNavigation();

  const { control, handleSubmit, formState } = useForm<PasswordRecoveryFormData>({
    defaultValues: {
      userCPF: '',
    },
    resolver: zodResolver(passwordRecoverySchema),
  });

  const onSubmit = (data: PasswordRecoveryFormData) => {
    navigate('Login');
  };

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <View className="flex-1">
        <View className="absolute top-0">
          <Image source={circles} />
        </View>
        <TouchableOpacity className="absolute top-10 z-50">
          <GoToPreviousScreen />
        </TouchableOpacity>
        <View className="flex-1 items-center justify-end py-8">
          <Text className="font-poppinsBold text-white text-6xl text-center py-5 mt-10 mb-32">
            OM Digital
          </Text>
        </View>
        <View className="h-32 items-center justify-end py-8">
          <Image source={logo} />
        </View>
      </View>

      <View className="bg-white px-6 py-8 h-fit rounded-t-xl">
        <Text className="font-poppinsBold text-base text-center mb-5">Recuperar senha</Text>
        <View className="mb-5">
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
        <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
          Recuperar Senha
        </CustomButton>
      </View>
    </View>
  );
}
