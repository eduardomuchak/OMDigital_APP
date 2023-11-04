import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { dismissRequestAPI } from '../../../services/GET/Solicitations/dismissRequest';

const useDismissRequest = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [dismissedRequestsQueue, setDismissedRequestsQueue] = useMMKVObject<
    number[]
  >('dismissedRequestsQueue');

  if (dismissedRequestsQueue === undefined) setDismissedRequestsQueue([]);

  const addDismissedRequestToQueue = (omId: number) => {
    if (!dismissedRequestsQueue) return;

    const newQueue = [...dismissedRequestsQueue, omId];
    setDismissedRequestsQueue(newQueue);
  };

  const removeFromQueue = (omId: number) => {
    if (!dismissedRequestsQueue) return;

    const newQueue = dismissedRequestsQueue.filter((om) => om !== omId);
    setDismissedRequestsQueue(newQueue);
  };

  const dismissRequestMutation = useMutation({
    mutationFn: dismissRequestAPI,
    onSuccess: (response, request) => {
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

        removeFromQueue(request);
        Alert.alert('Sucesso:', response.data.return[0]);
      } else {
        removeFromQueue(request);
        Alert.alert(
          'Opa! Algo deu errado ao sincronizar esta requisição:',
          response.data.return[0],
        );
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendDismissedRequestsQueue = () => {
    setIsSyncFinished(false);
    if (!dismissedRequestsQueue || dismissedRequestsQueue.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      dismissedRequestsQueue.forEach((request, index) => {
        dismissRequestMutation.mutate(request);
        const isTheLastRequest = index === dismissedRequestsQueue.length - 1;

        // When the last OM is sent, set isSyncFinished to true
        if (isTheLastRequest) {
          setTimeout(() => {
            setIsSyncFinished(true);
          }, 3000);
        }
      });
    }
  };

  return {
    isSyncFinished,
    addDismissedRequestToQueue,
    dismissRequestMutation,
    sendDismissedRequestsQueue,
  };
};

export default useDismissRequest;
