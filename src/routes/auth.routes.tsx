import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login';
import { PasswordRecovery } from '../screens/PasswordRecovery';

const Stack = createStackNavigator();

export const AuthRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
  </Stack.Navigator>
);
