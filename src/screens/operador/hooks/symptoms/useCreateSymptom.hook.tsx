import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { createNewSymptom } from '../../../../services/POST/Symptoms';
import { Symptom } from '../../../../services/POST/Symptoms/symptom.interface';

const useCreateSymptoms = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedCreateSymptom, setQueuedCreateSymptom] = useMMKVObject<
    Symptom.CreateNewSymptom[]
  >('queuedCreateSymptom');

  if (queuedCreateSymptom === undefined) setQueuedCreateSymptom([]);

  const addSymptomToQueue = (symptom: Symptom.CreateNewSymptom) => {
    if (!queuedCreateSymptom) return;

    const newQueue = [...queuedCreateSymptom, symptom];
    setQueuedCreateSymptom(newQueue);
  };

  const removeSymptomFromQueue = (
    symptom: Symptom.CreateNewSymptom | undefined,
  ) => {
    if (!queuedCreateSymptom || symptom === undefined) return;

    const newQueue = queuedCreateSymptom.filter(
      (queuedSymptom) => queuedSymptom !== symptom,
    );
    setQueuedCreateSymptom(newQueue);
  };

  const formatReturnMessage = (
    response: AxiosResponse<any, any>,
    request: Symptom.CreateNewSymptom,
    isStatusTrue: boolean,
  ) => {
    const symptom = request.description
      ? `Sintoma:
        ${request?.description}`
      : '';

    const message = isStatusTrue
      ? `Mensagem:
        ${response.data.return[0]}`
      : `Motivo do Erro:
        ${response.data.return[0]}`;

    const formattedMessage = `
      ${symptom}
      ${message}`;

    return formattedMessage;
  };

  const createSymptomMutation = useMutation({
    mutationFn: createNewSymptom,
    onSuccess: (response, request) => {
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });

        removeSymptomFromQueue(request);
        Alert.alert(
          'Sucesso:',
          formatReturnMessage(response, request, isStatusTrue),
        );
      } else {
        removeSymptomFromQueue(request);
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

  const sendCreatedSymptomsQueue = () => {
    setIsSyncFinished(false);
    if (!queuedCreateSymptom || queuedCreateSymptom.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedCreateSymptom.forEach((symptom, index) => {
        createSymptomMutation.mutate(symptom);
        const isTheLastOM = index === queuedCreateSymptom.length - 1;

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
    addSymptomToQueue,
    createSymptomMutation,
    sendCreatedSymptomsQueue,
  };
};

export default useCreateSymptoms;
