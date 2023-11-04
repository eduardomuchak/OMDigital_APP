import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { acceptRequestAPI } from '../../../services/GET/Solicitations/acceptRequest';

const useAcceptRequest = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [acceptedRequestsQueue, setAcceptedRequestsQueue] = useMMKVObject<
    number[]
  >('acceptedRequestsQueue');

  if (acceptedRequestsQueue === undefined) setAcceptedRequestsQueue([]);

  const addAccepetedRequestToQueue = (omId: number) => {
    if (!acceptedRequestsQueue) return;

    const newQueue = [...acceptedRequestsQueue, omId];
    setAcceptedRequestsQueue(newQueue);
  };

  const removeFromQueue = (omId: number) => {
    if (!acceptedRequestsQueue) return;

    const newQueue = acceptedRequestsQueue.filter((om) => om !== omId);
    setAcceptedRequestsQueue(newQueue);
  };

  const acceptRequestMutation = useMutation({
    mutationFn: acceptRequestAPI,
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

  const sendAcceptedRequestsQueue = () => {
    setIsSyncFinished(false);
    if (!acceptedRequestsQueue || acceptedRequestsQueue.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      acceptedRequestsQueue.forEach((request, index) => {
        acceptRequestMutation.mutate(request);
        const isTheLastRequest = index === acceptedRequestsQueue.length - 1;

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
    addAccepetedRequestToQueue,
    acceptRequestMutation,
    sendAcceptedRequestsQueue,
  };
};

export default useAcceptRequest;
