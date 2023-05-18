import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { GoToPreviousScreen } from '../../components/GoToPreviousScreen';
import { CustomButton } from '../../components/ui/CustomButton';
import { Input } from '../../components/ui/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import circles from '../../assets/circles-full.png';
import logo from '../../assets/logo/logo.png';
import { ErrorText } from '../../components/ui/ErrorText';
import { regexCPF } from '../../utils/validateCPF';
import {
  PasswordRecoveryFormData,
  passwordRecoverySchema,
} from '../../validations/PasswordRecoveryScreen';

export function PasswordRecovery() {
  const { navigate } = useNavigation();

  const { control, handleSubmit, formState } =
    useForm<PasswordRecoveryFormData>({
      defaultValues: {
        userCPF: '',
      },
      resolver: zodResolver(passwordRecoverySchema),
    });

  const onSubmit = (data: PasswordRecoveryFormData) => {
    navigate('Login');
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    // <View className="flex-1 bg-nepomuceno-dark-blue">
    //   <View className="flex-1">
    //     <View className="absolute top-0">
    //       <Image source={circles} />
    //     </View>
    //     <TouchableOpacity className="absolute top-10 z-50">
    //       <GoToPreviousScreen />
    //     </TouchableOpacity>
    //     <View className="flex-1 items-center justify-end py-8">
    //       <Text className="mb-32 mt-10 py-5 text-center font-poppinsBold text-6xl text-white">
    //         OM Digital
    //       </Text>
    //     </View>
    //     <View className="h-32 items-center justify-end py-8">
    //       <Image source={logo} />
    //     </View>
    //   </View>

    // </View>
    <View className="flex-1 bg-nepomuceno-dark-blue">
      {/* Circle, logo e título */}
      <View className="relative flex-1 items-center justify-center">
        <TouchableOpacity className="absolute left-5 top-10 z-50">
          <GoToPreviousScreen />
        </TouchableOpacity>
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
          Recuperar senha
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
