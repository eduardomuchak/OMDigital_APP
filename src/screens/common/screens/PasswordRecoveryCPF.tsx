import { Text, View } from 'react-native';
import { Input } from '../../../components/ui/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ErrorText } from '../../../components/ui/ErrorText';
import {
  PasswordRecoveryCPFFormData,
  passwordRecoverySchemaCPF,
} from '../../../validations/PasswordRecoveryScreen';
import { BackgroundCardContainer } from '../components/BackgroundCardContainer';
import { LogoAndCircles } from '../components/LogoAndCircles';
import { ResponseModal } from '../components/ResponseModal';

export function PasswordRecoveryCPF() {
  const { control, handleSubmit, formState } =
    useForm<PasswordRecoveryCPFFormData>({
      defaultValues: {
        userCPF: '',
      },
      resolver: zodResolver(passwordRecoverySchemaCPF),
    });

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <LogoAndCircles showGoBack />
      <BackgroundCardContainer>
        <Text className="mb-5 text-center font-poppinsBold text-base">
          Recuperar senha via CPF
        </Text>
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
          {formState.errors.userCPF?.message ? (
            <ErrorText>{formState.errors.userCPF?.message}</ErrorText>
          ) : null}
        </View>
        <ResponseModal handleSubmit={handleSubmit} />
      </BackgroundCardContainer>
    </View>
  );
}
