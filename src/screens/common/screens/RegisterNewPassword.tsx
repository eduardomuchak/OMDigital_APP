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
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import {
  NewPasswordFormData,
  newPasswordSchema,
} from '../../../validations/common/RegisterNewPassword';
import { BackgroundCardContainer } from '../components/BackgroundCardContainer';
import { LogoAndCircles } from '../components/LogoAndCircles';
import { ResponseModal } from '../components/ResponseModal';

export function RegisterNewPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = (data: NewPasswordFormData) => {
    console.log(data);
  };

  const togglePasswordVisibility = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordConfirmationVisibility = (
    event: GestureResponderEvent,
  ) => {
    event.preventDefault();
    setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible);
  };

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <LogoAndCircles />
      <BackgroundCardContainer>
        <Text className="mb-5 text-center font-poppinsBold text-base">
          Cadastrar nova senha
        </Text>
        <View className="mb-5">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-3">
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
                  activeOpacity={0.7}
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
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-3">
                <Input
                  label="CONFIRME A SENHA"
                  placeholder="Senha"
                  secureTextEntry={isPasswordConfirmationVisible ? false : true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maxLength={20}
                />
                <TouchableOpacity
                  className="absolute right-3 top-8"
                  onPress={(event) =>
                    togglePasswordConfirmationVisibility(event)
                  }
                  activeOpacity={0.7}
                >
                  {isPasswordConfirmationVisible ? (
                    <EyeSlash size={24} color="#000000" weight="bold" />
                  ) : (
                    <Eye size={24} color="#000000" weight="bold" />
                  )}
                </TouchableOpacity>
                {errors.passwordConfirmation?.message ? (
                  <ErrorText>{errors.passwordConfirmation?.message}</ErrorText>
                ) : null}
              </View>
            )}
            name="passwordConfirmation"
          />
        </View>
        <ResponseModal
          handleSubmit={handleSubmit}
          buttonText="Cadastrar Senha"
        />
      </BackgroundCardContainer>
    </View>
  );
}
