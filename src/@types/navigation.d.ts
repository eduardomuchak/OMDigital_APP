import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends Record<string, object | undefined> {
      home: undefined;
      login: undefined;
      registerNewActivity: undefined;
      registerNewActivity: undefined;
      registeredActivities: undefined;
      passwordRecovery: undefined;
    }
  }

  type RootStackNavigation = StackNavigationProp<RootParamList>;
  type RootStackRouteProp<T extends keyof RootParamList> = RouteProp<RootParamList, T>;
}
