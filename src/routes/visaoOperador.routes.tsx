import { createStackNavigator } from '@react-navigation/stack';
import { RegisterNewActivity } from '../screens/VisaoOperador/RegisterNewActivity';
import { Home } from '../screens/VisaoOperador/Home';
import { RegisterNewMaintenanceOrder } from '../screens/VisaoOperador/RegisterNewMaintenanceOrder';
import { CloseMaintenanceOrder } from '../screens/VisaoOperador/CloseMaintenanceOrder';
import { RegisteredActivities } from '../screens/VisaoOperador/RegisteredActivities';

const Stack = createStackNavigator();

export const VisaoOperadorRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="HomeOperador"
  >
    <Stack.Screen name="HomeOperador" component={Home} />
    <Stack.Screen name="RegisterNewActivity" component={RegisterNewActivity} />
    <Stack.Screen name="RegisterNewMaintenanceOrder" component={RegisterNewMaintenanceOrder} />
    <Stack.Screen name="CloseMaintenanceOrder" component={CloseMaintenanceOrder} />
    <Stack.Screen name="RegisteredActivitiesOperador" component={RegisteredActivities} />
  </Stack.Navigator>
);
