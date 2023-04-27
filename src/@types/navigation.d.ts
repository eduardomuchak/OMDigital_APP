import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends Record<string, object | undefined> {
      Home: undefined;
      Login: undefined;
      RegisterNewActivity: undefined;
      RegisterNewActivity: undefined;
      RegisteredActivities: undefined;
      PasswordRecovery: undefined;
      RegisterNewRequest: undefined;
      HomeSolicitante: undefined;
      HomeOperador: undefined;
      RegisterNewMaintenanceOrder: undefined;
    }
  }

  type RootStackNavigation = StackNavigationProp<RootParamList>;
  type RootStackRouteProp<T extends keyof RootParamList> = RouteProp<RootParamList, T>;
}
