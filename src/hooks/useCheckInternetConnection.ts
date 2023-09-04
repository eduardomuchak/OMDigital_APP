import NetInfo, {
  NetInfoState,
  NetInfoStateType,
} from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

const useCheckInternetConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const [connectionType, setConnectionType] = useState<NetInfoStateType>(
    NetInfoStateType.unknown,
  );

  const handleNetworkChange = (state: NetInfoState) => {
    setIsConnected(state.isConnected);
    setConnectionType(state.type);
  };

  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);
    return () => {
      netInfoSubscription && netInfoSubscription();
    };
  }, []);

  return { isConnected, connectionType };
};

export default useCheckInternetConnection;
