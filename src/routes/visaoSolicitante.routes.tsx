import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeSolicitante } from '../screens/VisaoSolicitante/HomeSolicitante';
import { RegisterNewRequest } from '../screens/VisaoSolicitante/RegisterNewRequest';

const Stack = createStackNavigator();

export const VisaoSolicitanteRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeSolicitante" component={HomeSolicitante} />
    <Stack.Screen name="RegisterNewRequest" component={RegisterNewRequest} />
  </Stack.Navigator>
);
