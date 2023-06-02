import { Text, View } from 'react-native';
import { Input } from '../../../components/ui/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ErrorText } from '../../../components/ui/ErrorText';
import {
  PasswordRecoverySMSFormData,
  passwordRecoverySchemaSMS,
} from '../../../validations/common/PasswordRecoveryScreen';
import { BackgroundCardContainer } from '../components/BackgroundCardContainer';
import { LogoAndCircles } from '../components/LogoAndCircles';
import { ResponseModal } from '../components/ResponseModal';

export function PasswordRecoverySMS() {
  const { control, handleSubmit, formState } =
    useForm<PasswordRecoverySMSFormData>({
      defaultValues: {
        userSMSNumber: '',
      },
      resolver: zodResolver(passwordRecoverySchemaSMS),
    });

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <LogoAndCircles showGoBack />
      <BackgroundCardContainer>
        <Text className="mb-5 text-center font-poppinsBold text-base">
          Recuperar senha via SMS
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
                label="NÚMERO DE TELEFONE"
                placeholder="(99) 99999-9999"
                keyboardType="numeric"
                maskedInput={true}
                maskType="cel-phone"
                maskOptions={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
              />
            )}
            name="userSMSNumber"
          />
          {formState.errors.userSMSNumber?.message ? (
            <ErrorText>{formState.errors.userSMSNumber?.message}</ErrorText>
          ) : null}
        </View>
        <ResponseModal handleSubmit={handleSubmit} />
      </BackgroundCardContainer>
    </View>
  );
}
