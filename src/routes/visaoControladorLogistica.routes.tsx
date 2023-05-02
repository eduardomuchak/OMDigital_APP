import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home } from '../screens/VisaoControladorLogistica/screens/HomeLogistica';

const Stack = createStackNavigator();

export const VisaoControladorLogisticaRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);
