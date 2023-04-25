import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterNewActivity } from '../screens/VisaoOperador/RegisterNewActivity';

const Stack = createStackNavigator();

export const VisaoOperadorRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="RegisterNewActivity" component={RegisterNewActivity} />
  </Stack.Navigator>
);
