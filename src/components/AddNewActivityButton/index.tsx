import { useNavigation } from '@react-navigation/native';
import { Plus } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export function AddNewActivityButton() {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate('RegisterNewActivity')}
      className="bg-nepomuceno-dark-blue rounded-full w-16 h-16 items-center justify-center absolute bottom-6 right-6 shadow-lg z-50"
      activeOpacity={0.7}
    >
      <Plus size={32} color="#FFFFFF" weight="bold" />
    </TouchableOpacity>
  );
}
