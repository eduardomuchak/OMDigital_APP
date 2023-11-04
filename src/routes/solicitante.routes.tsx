import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home } from '../screens/solicitante/screens/Home';
import { RegisterNewRequest } from '../screens/solicitante/screens/RegisterNewRequest';
import SyncSolicitante from '../screens/solicitante/screens/SyncSolicitante';

const Stack = createStackNavigator();

export const SolicitanteRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={'HomeSolicitante'}
  >
    <Stack.Screen name="SyncSolicitante" component={SyncSolicitante} />
    <Stack.Screen name="HomeSolicitante" component={Home} />
    <Stack.Screen name="RegisterNewRequest" component={RegisterNewRequest} />
  </Stack.Navigator>
);
