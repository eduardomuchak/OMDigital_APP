import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from '../screens/manutencao/screens/Home';
import { RegisteredActivities } from '../screens/manutencao/screens/RegisteredActivities';

const Stack = createStackNavigator();

export const ManutencaoRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeManutencao" component={Home} />
    <Stack.Screen
      name="RegisteredActivities"
      component={RegisteredActivities}
    />
  </Stack.Navigator>
);
