import { createStackNavigator } from '@react-navigation/stack';
import { CameraScreen } from '../screens/common/Camera';
import { Login } from '../screens/common/Login';
import { PasswordRecovery } from '../screens/common/PasswordRecovery';

const Stack = createStackNavigator();

export const AuthRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
    <Stack.Screen name="camera" component={CameraScreen} />
  </Stack.Navigator>
);
