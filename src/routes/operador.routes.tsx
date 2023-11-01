import { createStackNavigator } from '@react-navigation/stack';
import useCheckInternetConnection from '../hooks/useCheckInternetConnection';
import { CloseMaintenanceOrder } from '../screens/operador/screens/CloseMaintenanceOrder';
import { EditMaintenanceOrder } from '../screens/operador/screens/EditMaintenanceOrder';
import { Home } from '../screens/operador/screens/Home';
import { RegisterNewActivity } from '../screens/operador/screens/RegisterNewActivity';
import { RegisterNewMaintenanceOrder } from '../screens/operador/screens/RegisterNewMaintenanceOrder';
import { RegisterNewSymptom } from '../screens/operador/screens/RegisterNewSymptom';
import { RegisteredActivities } from '../screens/operador/screens/RegisteredActivities';
import SyncOperator from '../screens/operador/screens/SyncOperator';

const Stack = createStackNavigator();

export const OperadorRoutes: React.FC = () => {
  const { isConnected } = useCheckInternetConnection();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomeOperador'}
    >
      <Stack.Screen name="SyncOperator" component={SyncOperator} />
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
      <Stack.Screen name="RegisterNewSymptom" component={RegisterNewSymptom} />
      <Stack.Screen
        name="EditMaintenanceOrder"
        component={EditMaintenanceOrder}
      />
    </Stack.Navigator>
  );
};
