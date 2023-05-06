import { createStackNavigator } from '@react-navigation/stack';
import { CameraScreen } from '../screens/common/Camera';
import { CloseMaintenanceOrder } from '../screens/operador/screens/CloseMaintenanceOrder';
import { Home } from '../screens/operador/screens/Home';
import { RegisterNewActivity } from '../screens/operador/screens/RegisterNewActivity';
import { RegisterNewMaintenanceOrder } from '../screens/operador/screens/RegisterNewMaintenanceOrder';
import { RegisteredActivities } from '../screens/operador/screens/RegisteredActivities';

const Stack = createStackNavigator();

export const OperadorRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="HomeOperador"
  >
    <Stack.Screen name="HomeOperador" component={Home} />
    <Stack.Screen name="RegisterNewActivity" component={RegisterNewActivity} />
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
    <Stack.Screen name="camera" component={CameraScreen} />
  </Stack.Navigator>
);
