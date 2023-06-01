import { At, ChatCircleText, User } from 'phosphor-react-native';
import { ScrollView, Text, View } from 'react-native';
import { BackgroundCardContainer } from '../components/BackgroundCardContainer';
import { LogoAndCircles } from '../components/LogoAndCircles';
import { SelectionRecoveryCard } from '../components/SelectionRecoveryCard';

export function PasswordRecoverySelection() {
  const optionsToRecovery = [
    {
      name: 'Recuperar via CPF',
      redirect: 'PasswordRecoveryCPF',
      icon: <User size={52} color="#ffffff" weight="bold" />,
    },
    {
      name: 'Recuperar via Email',
      redirect: 'PasswordRecoveryEmail',
      icon: <At size={52} color="#ffffff" weight="bold" />,
    },
    {
      name: 'Recuperar via SMS',
      redirect: 'PasswordRecoverySMS',
      icon: <ChatCircleText size={52} color="#ffffff" weight="bold" />,
    },
  ];

  return (
    <View className="flex-1 bg-nepomuceno-dark-blue">
      <LogoAndCircles showGoBack />
      <BackgroundCardContainer>
        <Text className="mb-5 text-center font-poppinsBold text-base">
          Selecione o método de recuperação de senha
        </Text>
        <ScrollView
          horizontal
          className="flex-row"
          showsHorizontalScrollIndicator={false}
        >
          {optionsToRecovery.map((option) => (
            <SelectionRecoveryCard key={option.name} option={option} />
          ))}
        </ScrollView>
      </BackgroundCardContainer>
    </View>
  );
}
