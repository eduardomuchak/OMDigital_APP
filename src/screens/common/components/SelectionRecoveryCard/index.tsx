import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

interface Option {
  name: string;
  redirect: string;
  icon: JSX.Element;
}

interface SelectionRecoveryCardProps {
  option: Option;
}

export function SelectionRecoveryCard({ option }: SelectionRecoveryCardProps) {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mx-1 h-36 w-36 justify-between rounded-xl bg-primary-500 p-4"
      onPress={() => {
        navigate(option.redirect);
      }}
    >
      {option.icon}
      <Text className="font-poppinsBold text-base text-white">
        {option.name}
      </Text>
    </TouchableOpacity>
  );
}
