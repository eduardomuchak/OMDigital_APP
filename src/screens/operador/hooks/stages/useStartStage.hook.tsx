import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { startStage } from '../../../../services/POST/Stages/startStage';

interface StartQueue {
  activityId: number;
  manPowerId: string | null | undefined;
}

const useStartStage = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedStartActivity, setQueuedStartActivity] = useMMKVObject<
    StartQueue[]
  >('queuedStartActivity');

  if (queuedStartActivity === undefined) setQueuedStartActivity([]);

  const addActivityToStartQueue = ({ activityId, manPowerId }: StartQueue) => {
    if (!queuedStartActivity) return;
    // Check if activity is already in queue
    const isActivityInQueue = queuedStartActivity.find(
      (activity) => activity.activityId === activityId,
    );

    if (isActivityInQueue) return;

    setQueuedStartActivity([
      ...queuedStartActivity,
      {
        activityId,
        manPowerId,
      },
    ]);
  };

  const removeActivityFromStartQueue = (stageId: number) => {
    if (!queuedStartActivity) return;

    const newQueue = queuedStartActivity.filter((stage) => {
      return stage.activityId !== stageId;
    });

    setQueuedStartActivity(newQueue);
  };

  const startStageMutation = useMutation({
    mutationFn: startStage,
    onSuccess: (response, request) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        removeActivityFromStartQueue(request.stageId);
        Alert.alert('Sucesso', response.return[0]);
      } else {
        removeActivityFromStartQueue(request.stageId);
        Alert.alert('Erro', response.return.message);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendQueuedStartActivities = () => {
    setIsSyncFinished(false);
    if (!queuedStartActivity) return;
    if (queuedStartActivity.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedStartActivity.forEach((activity, index) => {
        const payload = {
          stageId: activity.activityId,
          manPowerId: activity.manPowerId,
        };
        startStageMutation.mutate(payload);

        const isTheLastActivity = index === queuedStartActivity.length - 1;
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
    startStageMutation,
    addActivityToStartQueue,
    sendQueuedStartActivities,
  };
};

export default useStartStage;
