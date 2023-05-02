import { createStackNavigator } from '@react-navigation/stack';
import { CloseMaintenanceOrder } from '../screens/VisaoOperador/screens/CloseMaintenanceOrder';
import { Home } from '../screens/VisaoOperador/screens/Home';
import { RegisterNewActivity } from '../screens/VisaoOperador/screens/RegisterNewActivity';
import { RegisterNewMaintenanceOrder } from '../screens/VisaoOperador/screens/RegisterNewMaintenanceOrder';
import { RegisteredActivities } from '../screens/VisaoOperador/screens/RegisteredActivities';

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
