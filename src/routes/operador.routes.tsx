import { createStackNavigator } from "@react-navigation/stack";
import { CloseMaintenanceOrder } from "../screens/operador/screens/CloseMaintenanceOrder";
import { Home } from "../screens/operador/screens/Home";
import { RegisterNewActivity } from "../screens/operador/screens/RegisterNewActivity";
import { RegisterNewMaintenanceOrder } from "../screens/operador/screens/RegisterNewMaintenanceOrder";
import { RegisteredActivities } from "../screens/operador/screens/RegisteredActivities";
import { OMContextProvider } from "../contexts/om-context";
import { RegisterNewSymptom } from "../screens/operador/screens/RegisterNewSymptom";
import { EditMaintenanceOrder } from "../screens/operador/screens/EditMaintenanceOrder";

const Stack = createStackNavigator();

export const OperadorRoutes: React.FC = () => (
  <OMContextProvider>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeOperador"
    >
      <Stack.Screen name="HomeOperador" component={Home} />
      <Stack.Screen
        name="RegisterNewActivity"
        component={RegisterNewActivity}
      />
      <Stack.Screen
        name="RegisterNewMaintenanceOrder"
        component={RegisterNewMaintenanceOrder}
      />
      <Stack.Screen
        name="CloseMaintenanceOrder"
        component={CloseMaintenanceOrder}
      />
      <Stack.Screen
        name="RegisteredActivitiesOperador"
        component={RegisteredActivities}
      />
      <Stack.Screen
        name="RegisterNewSymptom"
        component={RegisterNewSymptom}
      />
      <Stack.Screen
        name="EditMaintenanceOrder"
        component={EditMaintenanceOrder}
      />
    </Stack.Navigator>
  </OMContextProvider>
);
