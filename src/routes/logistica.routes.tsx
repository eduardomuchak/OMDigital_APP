import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from '../screens/logistica/screens/Home';

const Stack = createStackNavigator();

export const LogisticaRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);
