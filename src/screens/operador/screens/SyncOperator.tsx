import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { Alert, Text } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { SyncLoading } from '../../../components/SyncLoading';
import { CustomButton } from '../../../components/ui/CustomButton';
import { createNewMaintenanceOrder } from '../../../services/POST/OMs/createNewMaintenanceOrder.ts';
import { NewMaintenanceOrder } from '../../../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';

export function SyncOperator() {
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [maintenanceOrdersQueue, setMaintenanceOrdersQueue] = useMMKVObject<
    NewMaintenanceOrder.Payload[]
  >('queuedCreateNewMaintenanceOrder');
  if (maintenanceOrdersQueue === undefined) setMaintenanceOrdersQueue([]);

  // const addOMToQueue = (om: NewMaintenanceOrder.Payload) => {
  //   if (!maintenanceOrdersQueue) return;
  //   const newQueue = [...maintenanceOrdersQueue, om];
  //   setMaintenanceOrdersQueue(newQueue);
  // };

  const removeOMFromQueue = (omIndex: number | undefined) => {
    if (!maintenanceOrdersQueue || omIndex === undefined) {
      console.log(
        'removeOMFromQueue => !maintenanceOrdersQueue || omIndex === undefined',
      );
      return;
    }

    const newQueue = maintenanceOrdersQueue.filter((_, index) => {
      return index !== omIndex;
    });

    setMaintenanceOrdersQueue(newQueue);
  };

  const mutation = useMutation({
    mutationFn: createNewMaintenanceOrder,
    onSuccess: (response, request) => {
      // console.log('Request => ', request);
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

        // Update progress status
        const queueLength = maintenanceOrdersQueue!.length;
        const progress = 100 / queueLength;
        setProgress((prevProgressStatus) => prevProgressStatus + progress);

        if (request.omIndex === queueLength - 1) {
          setTimeout(() => {
            setIsSyncFinished(true);
          }, 2000);
        }

        // Remove OM from queue
        setTimeout(() => {
          removeOMFromQueue(request.omIndex);
        }, 1000);

        // Show alert with response message
        const formattedMessage = `
        Código do Bem: 
        ${request?.asset_code}
        
        Contador: 
        ${request?.counter}
        
        ${
          request.symptoms[0].description &&
          `Sintoma: 
          ${request?.symptoms[0].description}`
        } 
        
        ${
          request.obs &&
          `Observação: 
          ${request?.obs}`
        }
        
          Mensagem:
          ${response.data.return.message}`;

        Alert.alert('Sucesso:', formattedMessage);
      } else {
        // Update progress status
        const queueLength = maintenanceOrdersQueue!.length;
        const progress = 100 / queueLength;
        setProgress((prevProgressStatus) => prevProgressStatus + progress);

        if (request.omIndex === queueLength - 1) {
          setTimeout(() => {
            setIsSyncFinished(true);
          }, 2000);
        }

        // Remove OM from queue
        setTimeout(() => {
          removeOMFromQueue(request.omIndex);
        }, 1000);

        // Show alert with response message
        const formattedMessage = `
        Código do Bem: 
        ${request?.asset_code}
        
        Contador: 
        ${request?.counter}
        
        ${
          request.symptoms[0].description &&
          `Sintoma: 
          ${request?.symptoms[0].description}`
        } 
        
        ${
          request.obs &&
          `Observação: 
          ${request?.obs}`
        } 

          Motivo do Erro:
          ${response.data.return[0]}`;

        Alert.alert(
          'Opa! Algo deu errado ao sincronizar esta requisição:',
          formattedMessage,
        );
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const handleSendQueuedMaintenanceOrders = () => {
    setIsSyncFinished(false);
    if (!maintenanceOrdersQueue) {
      setIsSyncFinished(true);
      return;
    }
    if (maintenanceOrdersQueue.length > 0) {
      maintenanceOrdersQueue.forEach((om, index) => {
        // console.log('REQ => ', { om: om.asset_code, index });
        const omWithIndex = { ...om, omIndex: index };
        mutation.mutate(omWithIndex);
      });
    } else {
      setIsSyncFinished(true);
    }
  };

  // console.log('maintenanceOrdersQueue => ', maintenanceOrdersQueue);
  // console.log('isSyncFinished => ', isSyncFinished);
  // console.log('progress => ', progress);

  useFocusEffect(
    useCallback(() => {
      handleSendQueuedMaintenanceOrders();
    }, []),
  );

  if (!maintenanceOrdersQueue) {
    setTimeout(() => {
      setIsSyncFinished(false);
      setProgress(0);
      navigate('HomeOperador');
    }, 2000);
    return (
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutDown}
        className="flex h-screen flex-1 flex-col items-center justify-center gap-5 px-5"
      >
        <CheckCircle color="#046700" weight="bold" size={64} />
        <Text className="font-poppinsBold text-xl text-zinc-900">
          Iniciando o aplicativo...
        </Text>
      </Animated.View>
    );
  }

  if (isSyncFinished) {
    setTimeout(() => {
      setIsSyncFinished(false);
      setProgress(0);
      navigate('HomeOperador');
    }, 3000);
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

  return <SyncLoading progress={progress} />;
}

export default SyncOperator;
