import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'phosphor-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { SyncLoading } from '../../../components/SyncLoading';
import { CustomButton } from '../../../components/ui/CustomButton';
import useAcceptRequest from '../hooks/useAcceptRequest.hook';
import useDismissRequest from '../hooks/useDismissRequest.hook';

export function SyncManutencao() {
  const { navigate } = useNavigation();

  const {
    sendAcceptedRequestsQueue,
    isSyncFinished: isAcceptedRequestSyncFinished,
  } = useAcceptRequest();
  const {
    sendDismissedRequestsQueue,
    isSyncFinished: isDismissedRequestSyncFinished,
  } = useDismissRequest();

  const [isSyncFinished, setIsSyncFinished] = useState(false);

  const handleNavigation = () => {
    if (isSyncFinished) {
      setIsSyncFinished(false);
      setTimeout(() => {
        navigate('HomeOperador');
      }, 3000);
    }
  };

  useFocusEffect(
    useCallback(() => {
      sendAcceptedRequestsQueue();
      sendDismissedRequestsQueue();
    }, []),
  );

  useEffect(() => {
    handleNavigation();
  }, [isSyncFinished]);

  useEffect(() => {
    if (isAcceptedRequestSyncFinished && isDismissedRequestSyncFinished) {
      setIsSyncFinished(true);
    } else {
      setIsSyncFinished(false);
    }
  }, [isAcceptedRequestSyncFinished, isDismissedRequestSyncFinished]);

  if (isSyncFinished) {
    return (
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutDown}
        className="flex h-screen flex-1 flex-col items-center justify-center gap-5 px-5"
      >
        <CheckCircle color="#046700" weight="bold" size={64} />
        <Text className="font-poppinsBold text-xl text-zinc-900">
          Informações sincronizadas com sucesso!
        </Text>
        <CustomButton
          onPress={() => navigate('HomeManutencao')}
          variant="primary"
        >
          Ir para a tela inicial
        </CustomButton>
      </Animated.View>
    );
  }

  return <SyncLoading />;
}

export default SyncManutencao;
