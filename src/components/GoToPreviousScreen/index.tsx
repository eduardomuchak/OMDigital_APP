import { ArrowLeft } from 'phosphor-react-native';
import { CustomButton } from '../ui/CustomButton';
import { useNavigation } from '@react-navigation/native';

export function GoToPreviousScreen() {
  const { goBack } = useNavigation();

  return (
    <CustomButton variant="ghost" onPress={goBack} activeOpacity={0.7}>
      <ArrowLeft size={24} color="#FFFFFF" weight="bold" />
    </CustomButton>
  );
}
