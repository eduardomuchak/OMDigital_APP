import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends Record<string, object | undefined> {
      Home: undefined;
      Login: undefined;
      RegisterNewActivity: { id: number };
      RegisteredActivities: { id: number };
      PasswordRecoverySelection: undefined;
      PasswordRecoveryEmail: undefined;
      PasswordRecoverySMS: undefined;
      PasswordRecoveryCPF: undefined;
      RegisterNewRequest: undefined;
      HomeSolicitante: undefined;
      HomeOperador: undefined;
      RegisterNewMaintenanceOrder: undefined;
      RegisteredActivitiesOperador: { id: number };
      CloseMaintenanceOrder: { id: number };
      Camera: undefined;
      OpenedRequests: undefined;
      SyncOperator: undefined;
    }
  }

  type RootStackNavigation = StackNavigationProp<RootParamList>;
  type RootStackRouteProp<T extends keyof RootParamList> = RouteProp<
    RootParamList,
    T
  >;
}
