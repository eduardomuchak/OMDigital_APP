import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { apiDeleteStage } from '../../../../services/DELETE/Stages';

const useDeleteStage = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedDeleteActivity, setQueuedDeleteActivity] = useMMKVObject<
    number[]
  >('queuedDeleteActivity');

  if (queuedDeleteActivity === undefined) setQueuedDeleteActivity([]);

  const addActivityToDeleteQueue = (stageId: number) => {
    if (!queuedDeleteActivity) return;
    // Check if activity is already in queue
    const isActivityInQueue = queuedDeleteActivity.find(
      (activityId) => activityId === stageId,
    );

    if (isActivityInQueue) return;

    setQueuedDeleteActivity([...queuedDeleteActivity, stageId]);
  };

  const removeActivityFromDeleteQueue = (stageId: number | string) => {
    if (!queuedDeleteActivity) return;

    const newQueue = queuedDeleteActivity.filter((stage) => {
      return stage !== stageId;
    });

    setQueuedDeleteActivity(newQueue);
  };

  const deleteStageMutation = useMutation({
    mutationFn: apiDeleteStage,
    onSuccess: (response, request) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        removeActivityFromDeleteQueue(request);
        Alert.alert('Sucesso', response.return[0]);
      } else {
        removeActivityFromDeleteQueue(request);
        Alert.alert('Erro', response.return[0]);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendQueuedDeleteActivities = () => {
    setIsSyncFinished(false);
    if (!queuedDeleteActivity) return;
    if (queuedDeleteActivity.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedDeleteActivity.forEach((stageId, index) => {
        deleteStageMutation.mutate(stageId);

        const isTheLastActivity = index === queuedDeleteActivity.length - 1;
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
    deleteStageMutation,
    addActivityToDeleteQueue,
    sendQueuedDeleteActivities,
  };
};

export default useDeleteStage;
