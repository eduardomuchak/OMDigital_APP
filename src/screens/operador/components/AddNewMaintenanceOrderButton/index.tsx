import { useNavigation } from "@react-navigation/native";
import { Plus } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function AddNewMaintenanceOrderButton() {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate("RegisterNewMaintenanceOrder")}
      className="absolute bottom-6 right-6 z-50 h-16 w-16 items-center justify-center rounded-full bg-nepomuceno-dark-blue shadow-lg"
      activeOpacity={0.7}
    >
      <Plus size={32} color="#FFFFFF" weight="bold" />
    </TouchableOpacity>
  );
}
