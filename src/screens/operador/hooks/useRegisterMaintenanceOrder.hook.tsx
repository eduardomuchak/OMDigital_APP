import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import useCheckInternetConnection from '../../../hooks/useCheckInternetConnection';
import { createNewMaintenanceOrder } from '../../../services/POST/OMs/createNewMaintenanceOrder.ts';
import { NewMaintenanceOrder } from '../../../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';

interface OMIndex {
  omIndex?: number;
}

const useRegisterMaintenanceOrder = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckInternetConnection();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedCreateNewMaintenanceOrder, setQueuedCreateNewMaintenanceOrder] =
    useMMKVObject<NewMaintenanceOrder.Payload[]>(
      'queuedCreateNewMaintenanceOrder',
    );
  if (queuedCreateNewMaintenanceOrder === undefined)
    setQueuedCreateNewMaintenanceOrder([]);

  console.log(
    'queuedCreateNewMaintenanceOrder',
    queuedCreateNewMaintenanceOrder,
  );

  const addOMToQueue = (om: NewMaintenanceOrder.Payload) => {
    if (!queuedCreateNewMaintenanceOrder) return;
    const newQueue = [...queuedCreateNewMaintenanceOrder, om];
    setQueuedCreateNewMaintenanceOrder(newQueue);
  };

  const removeOMFromCreateOMQueue = (omIndex: number | undefined) => {
    if (!queuedCreateNewMaintenanceOrder || omIndex === undefined) return;

    const newQueue = queuedCreateNewMaintenanceOrder.filter((_, index) => {
      return index !== omIndex;
    });

    setQueuedCreateNewMaintenanceOrder(newQueue);
  };

  const formatReturnMessage = (
    response: AxiosResponse<any, any>,
    request: NewMaintenanceOrder.Payload & OMIndex,
    isStatusTrue: boolean,
  ) => {
    const assetCode = `
      Código do Bem: 
      ${request?.asset_code}`;

    const counter = `
      Contador: 
      ${request?.counter}`;

    const symptoms = request.symptoms[0].description
      ? `Sintoma: 
        ${request?.symptoms[0].description}`
      : '';

    const obs = request.obs
      ? `Observação:
        ${request?.obs}`
      : '';

    const message = isStatusTrue
      ? `Mensagem:
        ${response.data.return.message}`
      : `Motivo do Erro:
        ${response.data.return[0]}`;

    const formattedMessage = `
      ${assetCode}
      ${counter}
      ${symptoms}
      ${obs}
      ${message}`;

    return formattedMessage;
  };

  const createNewMaintenanceOrderMutation = useMutation({
    mutationFn: createNewMaintenanceOrder,
    onSuccess: (response, request) => {
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

        if (isConnected) {
          // Remove OM from queue
          removeOMFromCreateOMQueue(request.omIndex);

          // Show alert with response message
          Alert.alert(
            'Sucesso:',
            formatReturnMessage(response, request, isStatusTrue),
          );
        } else {
          // Remove OM from queue
          removeOMFromCreateOMQueue(request.omIndex);

          // Show alert with response message
          Alert.alert(
            'Sucesso:',
            formatReturnMessage(response, request, isStatusTrue),
          );
        }
      } else {
        // Remove OM from queue
        setTimeout(() => {
          removeOMFromCreateOMQueue(request.omIndex);
        }, 1000);

        // Show alert with response message
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

  const sendQueuedCreateMaintenanceOrders = () => {
    setIsSyncFinished(false);
    if (
      !queuedCreateNewMaintenanceOrder ||
      queuedCreateNewMaintenanceOrder.length === 0
    ) {
      setIsSyncFinished(true);
      return;
    }
    if (queuedCreateNewMaintenanceOrder.length > 0) {
      queuedCreateNewMaintenanceOrder.forEach((om, index) => {
        const omWithIndex = { ...om, omIndex: index };
        createNewMaintenanceOrderMutation.mutate(omWithIndex);

        // When the last OM is sent, set isSyncFinished to true
        if (index === queuedCreateNewMaintenanceOrder.length - 1) {
          setTimeout(() => {
            setIsSyncFinished(true);
          }, 3000);
        }
      });
    } else {
      setIsSyncFinished(false);
    }
  };

  return {
    isSyncFinished,
    addOMToQueue,
    createNewMaintenanceOrderMutation,
    sendQueuedCreateMaintenanceOrders,
  };
};

export default useRegisterMaintenanceOrder;
