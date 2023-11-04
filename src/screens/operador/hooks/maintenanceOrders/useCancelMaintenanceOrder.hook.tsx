import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { deleteMaintenanceOrderAPI } from '../../../../services/DELETE/MaintenanceOrder';
import { DeleteMaintenanceOrder } from '../../../../services/DELETE/MaintenanceOrder/index.interface';

const useCancelMaintenanceOrder = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedCancelMaintenanceOrder, setQueuedCancelMaintenanceOrder] =
    useMMKVObject<number[]>('queuedCancelMaintenanceOrder');

  if (queuedCancelMaintenanceOrder === undefined)
    setQueuedCancelMaintenanceOrder([]);

  const addCancelOMToQueue = (omId: number) => {
    if (!queuedCancelMaintenanceOrder) return;

    const newQueue = [...queuedCancelMaintenanceOrder, omId];
    setQueuedCancelMaintenanceOrder(newQueue);
  };

  const removeCancelOMFromQueue = (omId: number) => {
    if (!queuedCancelMaintenanceOrder) return;

    const newQueue = queuedCancelMaintenanceOrder.filter((om) => om !== omId);
    setQueuedCancelMaintenanceOrder(newQueue);
  };

  const formatReturnMessage = (
    response: DeleteMaintenanceOrder.Response,
    request: number,
    isStatusTrue: boolean,
  ) => {
    const message = isStatusTrue
      ? `Mensagem:
        ${response.return[0]}`
      : `Motivo do Erro:
        ${response.return[0]}`;

    const formattedMessage = `
      ${message}`;

    return formattedMessage;
  };

  const cancelMaintenanceOrderMutation = useMutation({
    mutationFn: deleteMaintenanceOrderAPI,
    onSuccess: (response, request) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

        removeCancelOMFromQueue(request);
        Alert.alert(
          'Sucesso:',
          formatReturnMessage(response, request, isStatusTrue),
        );
      } else {
        removeCancelOMFromQueue(request);
        Alert.alert(
          'Opa! Algo deu errado ao sincronizar esta requisição:',
          formatReturnMessage(response, request, isStatusTrue),
        );
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendCancelMaintenanceOrdersQueue = () => {
    setIsSyncFinished(false);
    if (
      !queuedCancelMaintenanceOrder ||
      queuedCancelMaintenanceOrder.length === 0
    ) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedCancelMaintenanceOrder.forEach((symptom, index) => {
        cancelMaintenanceOrderMutation.mutate(symptom);
        const isTheLastOM = index === queuedCancelMaintenanceOrder.length - 1;

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
    addCancelOMToQueue,
    cancelMaintenanceOrderMutation,
    sendCancelMaintenanceOrdersQueue,
  };
};

export default useCancelMaintenanceOrder;
