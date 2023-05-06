import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CameraScreen } from '../screens/common/Camera';
import { Home } from '../screens/solicitante/screens/Home';
import { RegisterNewRequest } from '../screens/solicitante/screens/RegisterNewRequest';

const Stack = createStackNavigator();

export const SolicitanteRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeSolicitante" component={Home} />
    <Stack.Screen name="RegisterNewRequest" component={RegisterNewRequest} />
    <Stack.Screen name="camera" component={CameraScreen} />
  </Stack.Navigator>
);
