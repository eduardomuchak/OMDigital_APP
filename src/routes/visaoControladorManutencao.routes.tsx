import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RegisteredActivities } from '../screens/VisaoControladorManutencao/RegisteredActivities';
import { Home } from '../screens/VisaoControladorManutencao/Home';

const Stack = createStackNavigator();

export const VisaoControladorManutencaoRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeManutencao" component={Home} />
    <Stack.Screen name="RegisteredActivities" component={RegisteredActivities} />
  </Stack.Navigator>
);
