import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home } from '../screens/VisaoSolicitante/screens/Home';
import { RegisterNewRequest } from '../screens/VisaoSolicitante/screens/RegisterNewRequest';

const Stack = createStackNavigator();

export const VisaoSolicitanteRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeSolicitante" component={Home} />
    <Stack.Screen name="RegisterNewRequest" component={RegisterNewRequest} />
  </Stack.Navigator>
);
