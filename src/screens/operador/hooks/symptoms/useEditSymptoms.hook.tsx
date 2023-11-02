import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { editMaintenanceOrder } from '../../../../services/POST/OMs/editMaintenanceOrder';
import { EditedMaintenanceOrder } from '../../../../services/POST/OMs/editMaintenanceOrder/index.interface';

const useEditSymptoms = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedEditMaintenanceOrder, setQueuedEditMaintenanceOrder] =
    useMMKVObject<EditedMaintenanceOrder[]>('queuedEditMaintenanceOrder');

  if (queuedEditMaintenanceOrder === undefined)
    setQueuedEditMaintenanceOrder([]);

  const addOMToQueue = (om: EditedMaintenanceOrder) => {
    if (!queuedEditMaintenanceOrder) return;

    const omIndex = queuedEditMaintenanceOrder.findIndex(
      (queuedOM) => queuedOM.id === om.id,
    );
    if (omIndex !== -1) {
      const newQueue = queuedEditMaintenanceOrder.map((queuedOM, index) => {
        if (index === omIndex) {
          return om;
        }
        return queuedOM;
      });
      setQueuedEditMaintenanceOrder(newQueue);
      return;
    } else {
      setQueuedEditMaintenanceOrder([...queuedEditMaintenanceOrder, om]);
    }
  };

  const removeOMFromEditOMQueue = (om: EditedMaintenanceOrder | undefined) => {
    if (!queuedEditMaintenanceOrder || om === undefined) return;

    const newQueue = queuedEditMaintenanceOrder.filter((queuedOM) => {
      return queuedOM.id !== om.id;
    });
    setQueuedEditMaintenanceOrder(newQueue);
  };

  const formatReturnMessage = (
    response: AxiosResponse<any, any>,
    request: EditedMaintenanceOrder,
    isStatusTrue: boolean,
  ) => {
    const assetCode = `
      Código do Bem: 
      ${request?.asset_code}`;

    const counter = `
      Contador: 
      ${request?.counter}`;

    const symptoms = request.symptoms[0].description
      ? `Sintomas: 
        ${request?.symptoms.map((symptom) => symptom.description).join(', ')}`
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

  const editMaintenanceOrderMutation = useMutation({
    mutationFn: editMaintenanceOrder,
    onSuccess: (response, request) => {
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

        removeOMFromEditOMQueue(request);
        Alert.alert(
          'Sucesso:',
          formatReturnMessage(response, request, isStatusTrue),
        );
      } else {
        removeOMFromEditOMQueue(request);
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

  const sendQueuedEditMaintenanceOrders = () => {
    setIsSyncFinished(false);
    if (
      !queuedEditMaintenanceOrder ||
      queuedEditMaintenanceOrder.length === 0
    ) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedEditMaintenanceOrder.forEach((om, index) => {
        const omWithIndex = { ...om, omIndex: index };
        editMaintenanceOrderMutation.mutate(omWithIndex);
        const isTheLastOM = index === queuedEditMaintenanceOrder.length - 1;

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
    addOMToQueue,
    editMaintenanceOrderMutation,
    sendQueuedEditMaintenanceOrders,
  };
};

export default useEditSymptoms;
