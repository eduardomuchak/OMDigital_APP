import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { pauseStage } from '../../../../services/POST/Stages/pauseStage';

interface PauseQueue {
  activityId: number;
  manPowerId: string | null | undefined;
}

const usePauseStage = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedPauseActivity, setQueuedPauseActivity] = useMMKVObject<
    PauseQueue[]
  >('queuedPauseActivity');

  if (queuedPauseActivity === undefined) setQueuedPauseActivity([]);

  const addActivityToPauseQueue = ({ activityId, manPowerId }: PauseQueue) => {
    if (!queuedPauseActivity) return;
    // Check if activity is already in queue
    const isActivityInQueue = queuedPauseActivity.find(
      (activity) => activity.activityId === activityId,
    );

    if (isActivityInQueue) return;

    setQueuedPauseActivity([
      ...queuedPauseActivity,
      {
        activityId,
        manPowerId,
      },
    ]);
  };

  const removeActivityFromPauseQueue = (stageId: number) => {
    if (!queuedPauseActivity) return;

    const newQueue = queuedPauseActivity.filter((stage) => {
      return stage.activityId !== stageId;
    });

    setQueuedPauseActivity(newQueue);
  };

  const pauseStageMutation = useMutation({
    mutationFn: pauseStage,
    onSuccess: (response, request) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        removeActivityFromPauseQueue(request.stageId);
        Alert.alert('Sucesso', response.return[0]);
      } else {
        removeActivityFromPauseQueue(request.stageId);
        Alert.alert('Erro', response.return.message);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendQueuedPauseActivities = () => {
    setIsSyncFinished(false);
    if (!queuedPauseActivity) return;
    if (queuedPauseActivity.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedPauseActivity.forEach((activity, index) => {
        const payload = {
          stageId: activity.activityId,
          manPowerId: activity.manPowerId,
        };
        pauseStageMutation.mutate(payload);

        const isTheLastActivity = index === queuedPauseActivity.length - 1;
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
    pauseStageMutation,
    addActivityToPauseQueue,
    sendQueuedPauseActivities,
  };
};

export default usePauseStage;
