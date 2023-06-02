import { Text, View } from 'react-native';
import { Input } from '../../../components/ui/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ErrorText } from '../../../components/ui/ErrorText';
import {
  PasswordRecoveryEmailFormData,
  passwordRecoverySchemaEmail,
} from '../../../validations/common/PasswordRecoveryScreen';
import { BackgroundCardContainer } from '../components/BackgroundCardContainer';
import { LogoAndCircles } from '../components/LogoAndCircles';
import { ResponseModal } from '../components/ResponseModal';

export function PasswordRecoveryEmail() {
  const { control, handleSubmit, formState } =
    useForm<PasswordRecoveryEmailFormData>({
      defaultValues: {
        userEmail: '',
      },
      resolver: zodResolver(passwordRecoverySchemaEmail),
    });

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <LogoAndCircles showGoBack />
      <BackgroundCardContainer>
        <Text className="mb-5 text-center font-poppinsBold text-base">
          Recuperar senha via Email
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
                label="EMAIL"
                placeholder="exemplo@expressonepomuceno.com.br"
                maxLength={40}
              />
            )}
            name="userEmail"
          />
          {formState.errors.userEmail?.message ? (
            <ErrorText>{formState.errors.userEmail?.message}</ErrorText>
          ) : null}
        </View>
        <ResponseModal handleSubmit={handleSubmit} />
      </BackgroundCardContainer>
    </View>
  );
}
