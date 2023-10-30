import { useNavigation } from '@react-navigation/native';
import { Plus } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import useCheckInternetConnection from '../../../../hooks/useCheckInternetConnection';
import { NewMaintenanceOrder } from '../../../../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';

export function AddNewMaintenanceOrderButton() {
  const { navigate } = useNavigation();
  const { isConnected } = useCheckInternetConnection();
  const [maintenanceOrdersQueue, setMaintenanceOrdersQueue] = useMMKVObject<
    NewMaintenanceOrder.Payload[]
  >('queuedCreateNewMaintenanceOrder');
  if (maintenanceOrdersQueue === undefined) setMaintenanceOrdersQueue([]);

  const handleMarginBottom = () => {
    if (isConnected && maintenanceOrdersQueue?.length === 0) return 24;
    if (isConnected && maintenanceOrdersQueue!.length > 0) return 140;
    if (!isConnected) return 106;
  };

  return (
    <TouchableOpacity
      onPress={() => navigate('RegisterNewMaintenanceOrder')}
      className="absolute z-50 h-16 w-16 items-center justify-center rounded-full bg-nepomuceno-dark-blue shadow-lg"
      activeOpacity={0.7}
      style={{
        bottom: handleMarginBottom(),
        right: 24,
      }}
    >
      <Plus size={32} color="#FFFFFF" weight="bold" />
    </TouchableOpacity>
  );
}
