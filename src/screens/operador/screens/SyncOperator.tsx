import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'phosphor-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { SyncLoading } from '../../../components/SyncLoading';
import { CustomButton } from '../../../components/ui/CustomButton';
import useRegisterMaintenanceOrder from '../hooks/maintenanceOrders/useRegisterMaintenanceOrder.hook';
import usePauseStage from '../hooks/stages/usePauseStage.hook';
import useStartStage from '../hooks/stages/useStartStage.hook';
import useEditSymptoms from '../hooks/symptoms/useEditSymptoms.hook';

export function SyncOperator() {
  const { navigate } = useNavigation();

  const {
    sendQueuedCreateMaintenanceOrders,
    isSyncFinished: isCreateOMSyncFinished,
  } = useRegisterMaintenanceOrder();
  const {
    sendQueuedEditMaintenanceOrders,
    isSyncFinished: isEditOMSyncFinished,
  } = useEditSymptoms();
  const {
    sendQueuedPauseActivities,
    isSyncFinished: isPausedActivitiesSyncFinished,
  } = usePauseStage();
  const {
    sendQueuedStartActivities,
    isSyncFinished: isStartedActivitiesSyncFinished,
  } = useStartStage();

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
      sendQueuedCreateMaintenanceOrders();
      sendQueuedEditMaintenanceOrders();
      sendQueuedPauseActivities();
      sendQueuedStartActivities();
    }, []),
  );

  useEffect(() => {
    handleNavigation();
  }, [isSyncFinished]);

  useEffect(() => {
    if (
      isCreateOMSyncFinished &&
      isEditOMSyncFinished &&
      isPausedActivitiesSyncFinished &&
      isStartedActivitiesSyncFinished
    ) {
      setIsSyncFinished(true);
    } else {
      setIsSyncFinished(false);
    }
  }, [
    isCreateOMSyncFinished,
    isEditOMSyncFinished,
    isPausedActivitiesSyncFinished,
    isStartedActivitiesSyncFinished,
  ]);

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

export default SyncOperator;
