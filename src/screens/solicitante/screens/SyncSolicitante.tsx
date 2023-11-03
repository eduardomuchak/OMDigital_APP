import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'phosphor-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { SyncLoading } from '../../../components/SyncLoading';
import { CustomButton } from '../../../components/ui/CustomButton';
import useCreateRequest from '../hooks/requests/useCreateRequest.hook';

export function SyncSolicitante() {
  const { navigate } = useNavigation();

  const {
    sendQueuedCreateRequests,
    isSyncFinished: isCreateRequestSyncFinished,
  } = useCreateRequest();

  const [isSyncFinished, setIsSyncFinished] = useState(false);

  const handleNavigation = () => {
    if (isSyncFinished) {
      setIsSyncFinished(false);
      setTimeout(() => {
        navigate('HomeSolicitante');
      }, 3000);
    }
  };

  useFocusEffect(
    useCallback(() => {
      sendQueuedCreateRequests();
    }, []),
  );

  useEffect(() => {
    handleNavigation();
  }, [isSyncFinished]);

  useEffect(() => {
    if (isCreateRequestSyncFinished) {
      setIsSyncFinished(true);
    } else {
      setIsSyncFinished(false);
    }
  }, [isCreateRequestSyncFinished]);

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
          onPress={() => navigate('HomeOperador')}
          variant="primary"
        >
          Ir para a tela inicial
        </CustomButton>
      </Animated.View>
    );
  }

  return <SyncLoading />;
}

export default SyncSolicitante;
