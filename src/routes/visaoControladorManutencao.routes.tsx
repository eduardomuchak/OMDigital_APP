import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from '../screens/VisaoControladorManutencao/screens/Home';
import { RegisteredActivities } from '../screens/VisaoControladorManutencao/screens/RegisteredActivities';

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
