import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { OMContextProvider } from "../contexts/om-context";
import { Home } from "../screens/logistica/screens/Home";

const Stack = createStackNavigator();

export const LogisticaRoutes: React.FC = () => (
  <OMContextProvider>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </OMContextProvider>
);
