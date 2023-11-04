import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { endMaintenanceOrderAPI } from '../../../../services/GET/Maintenance/getEndMaintenanceOrder';
import { EndMaintenanceOrder } from '../../../../services/GET/Maintenance/getEndMaintenanceOrder/index.interface';

const useFinishMaintenanceOrder = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedFinishMaintenanceOrder, setQueuedFinishMaintenanceOrder] =
    useMMKVObject<number[]>('queuedFinishMaintenanceOrder');

  if (queuedFinishMaintenanceOrder === undefined)
    setQueuedFinishMaintenanceOrder([]);

  const addFinishOMToQueue = (omId: number) => {
    if (!queuedFinishMaintenanceOrder) return;

    // Verify if the OM is already in the queue
    const isAlreadyInQueue = queuedFinishMaintenanceOrder.some(
      (om) => om === omId,
    );
    if (isAlreadyInQueue) return;

    const newQueue = [...queuedFinishMaintenanceOrder, omId];
    setQueuedFinishMaintenanceOrder(newQueue);
  };

  const removeFinishOMFromQueue = (omId: number | string) => {
    if (!queuedFinishMaintenanceOrder) return;

    const newQueue = queuedFinishMaintenanceOrder.filter((om) => om !== omId);
    setQueuedFinishMaintenanceOrder(newQueue);
  };

  const formatReturnMessage = (
    response: EndMaintenanceOrder.Response,
    request: number | string,
    isStatusTrue: boolean,
  ) => {
    const message = isStatusTrue
      ? `Mensagem:
        ${response.return.message}`
      : `Motivo do Erro:
        ${response.return.message}`;

    const formattedMessage = `
      ${message}`;

    return formattedMessage;
  };

  const finishMaintenanceOrderMutation = useMutation({
    mutationFn: endMaintenanceOrderAPI,
    onSuccess: (response, request) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

        removeFinishOMFromQueue(request);
        Alert.alert(
          'Sucesso:',
          formatReturnMessage(response, request, isStatusTrue),
        );
      } else {
        removeFinishOMFromQueue(request);
        Alert.alert(
          'Erro:',
          formatReturnMessage(response, request, isStatusTrue),
        );
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendFinishMaintenanceOrdersQueue = () => {
    setIsSyncFinished(false);
    if (
      !queuedFinishMaintenanceOrder ||
      queuedFinishMaintenanceOrder.length === 0
    ) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedFinishMaintenanceOrder.forEach((symptom, index) => {
        finishMaintenanceOrderMutation.mutate(symptom);
        const isTheLastOM = index === queuedFinishMaintenanceOrder.length - 1;

        // When the last OM is sent, set isSyncFinished to true
        if (isTheLastOM) {
          setTimeout(() => {
            setIsSyncFinished(true);
          }, 3000);
        }
      });
    }
  };

  return {
    isSyncFinished,
    addFinishOMToQueue,
    finishMaintenanceOrderMutation,
    sendFinishMaintenanceOrdersQueue,
  };
};

export default useFinishMaintenanceOrder;
