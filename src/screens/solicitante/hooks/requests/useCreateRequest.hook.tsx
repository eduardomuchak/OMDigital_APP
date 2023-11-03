import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { saveRequest } from '../../../../services/POST/Solicitations/saveRequest/index';
import { SaveRequest } from '../../../../services/POST/Solicitations/saveRequest/saveRequest.interface';

interface RequestIndex {
  requestIndex?: number;
}

const useCreateRequest = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedCreateRequest, setQueuedCreateRequest] = useMMKVObject<
    SaveRequest[]
  >('queuedCreateRequest');

  if (queuedCreateRequest === undefined) setQueuedCreateRequest([]);

  const addRequestToQueue = (request: SaveRequest) => {
    if (!queuedCreateRequest) return;

    const newQueue = [...queuedCreateRequest, request];
    setQueuedCreateRequest(newQueue);
  };

  const removeRequestFromQueue = (requestIndex: number | undefined) => {
    if (!queuedCreateRequest || requestIndex === undefined) return;

    const newQueue = queuedCreateRequest.filter((_, index) => {
      return index !== requestIndex;
    });

    setQueuedCreateRequest(newQueue);
  };

  const formatReturnMessage = (
    response: AxiosResponse<any, any>,
    request: SaveRequest & RequestIndex,
    isStatusTrue: boolean,
  ) => {
    const assetCode = `
      Código do Bem: 
      ${request?.asset_code}`;

    const counter = `
      Contador: 
      ${request?.counter}`;

    const message = isStatusTrue
      ? `Mensagem:
        ${response.data.return[0]}`
      : `Motivo do Erro:
        ${response.data.return[0]}`;

    const formattedMessage = `
      ${assetCode}
      ${counter}
      ${message}`;

    return formattedMessage;
  };

  const createRequestMutation = useMutation({
    mutationFn: saveRequest,
    onSuccess: (response, request) => {
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listRequest'] });
        removeRequestFromQueue(request.requestIndex);
        Alert.alert(
          'Sucesso',
          formatReturnMessage(response, request, isStatusTrue),
        );
      } else {
        removeRequestFromQueue(request.requestIndex);
        Alert.alert(
          'Erro',
          formatReturnMessage(response, request, isStatusTrue),
        );
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendQueuedCreateRequests = () => {
    setIsSyncFinished(false);
    if (!queuedCreateRequest || queuedCreateRequest.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedCreateRequest.forEach((om, index) => {
        const omWithIndex = { ...om, requestIndex: index };
        createRequestMutation.mutate(omWithIndex);

        const isTheLastRequest = index === queuedCreateRequest.length - 1;

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
    addRequestToQueue,
    createRequestMutation,
    sendQueuedCreateRequests,
  };
};

export default useCreateRequest;
