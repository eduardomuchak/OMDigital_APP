import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { createNewMaintenanceOrderStage } from '../../../../services/POST/Stages/createStage';
import { Stage } from '../../../../services/POST/Stages/stages.interface';

const useCreateStage = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedCreateActivity, setQueuedCreateActivity] = useMMKVObject<
    Stage.CreateStage[]
  >('queuedCreateActivity');

  if (queuedCreateActivity === undefined) setQueuedCreateActivity([]);

  const addActivityToCreateQueue = (stage: Stage.CreateStage) => {
    if (!queuedCreateActivity) return;
    setQueuedCreateActivity([...queuedCreateActivity, stage]);
  };

  const removeActivityFromCreateQueue = (stage: Stage.CreateStage) => {
    if (!queuedCreateActivity) return;

    const newQueue = queuedCreateActivity.filter(
      (activity) => activity !== stage,
    );

    setQueuedCreateActivity(newQueue);
  };

  const createStageMutation = useMutation({
    mutationFn: createNewMaintenanceOrderStage,
    onSuccess: (response, request) => {
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({
          queryKey: ['listMaintenanceOrder'],
        });
        removeActivityFromCreateQueue(request);
        Alert.alert('Sucesso', response.data.return[0]);
      } else {
        removeActivityFromCreateQueue(request);
        Alert.alert('Erro', response.data.return[0]);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendQueuedCreateActivities = () => {
    setIsSyncFinished(false);
    if (!queuedCreateActivity) return;
    if (queuedCreateActivity.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedCreateActivity.forEach((stage, index) => {
        createStageMutation.mutate(stage);

        const isTheLastActivity = index === queuedCreateActivity.length - 1;
        if (isTheLastActivity) {
          setTimeout(() => {
            setIsSyncFinished(true);
          }, 3000);
        }
      });
    }
  };

  return {
    isSyncFinished,
    createStageMutation,
    addActivityToCreateQueue,
    sendQueuedCreateActivities,
  };
};

export default useCreateStage;
