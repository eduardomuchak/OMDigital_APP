import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/common/screens/Login';
import { PasswordRecoveryCPF } from '../screens/common/screens/PasswordRecoveryCPF';
import { PasswordRecoveryEmail } from '../screens/common/screens/PasswordRecoveryEmail';
import { PasswordRecoverySMS } from '../screens/common/screens/PasswordRecoverySMS';
import { PasswordRecoverySelection } from '../screens/common/screens/PasswordRecoverySelection';
import { RegisterNewPassword } from '../screens/common/screens/RegisterNewPassword';

const Stack = createStackNavigator();

export const AuthRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen
      name="PasswordRecoverySelection"
      component={PasswordRecoverySelection}
    />
    <Stack.Screen name="PasswordRecoverySMS" component={PasswordRecoverySMS} />
    <Stack.Screen
      name="PasswordRecoveryEmail"
      component={PasswordRecoveryEmail}
    />
    <Stack.Screen name="PasswordRecoveryCPF" component={PasswordRecoveryCPF} />
    <Stack.Screen name="RegisterNewPassword" component={RegisterNewPassword} />
  </Stack.Navigator>
);
