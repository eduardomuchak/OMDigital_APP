import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { endStage } from '../../../../services/POST/Stages/endStage';

interface EndQueue {
  activityId: number;
  manPowerId: string | null | undefined;
}

const useEndStage = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedEndActivity, setQueuedEndActivity] =
    useMMKVObject<EndQueue[]>('queuedEndActivity');

  if (queuedEndActivity === undefined) setQueuedEndActivity([]);

  const addActivityToEndQueue = ({ activityId, manPowerId }: EndQueue) => {
    if (!queuedEndActivity) return;
    // Check if activity is already in queue
    const isActivityInQueue = queuedEndActivity.find(
      (activity) => activity.activityId === activityId,
    );

    if (isActivityInQueue) return;

    setQueuedEndActivity([
      ...queuedEndActivity,
      {
        activityId,
        manPowerId,
      },
    ]);
  };

  const removeActivityFromEndQueue = (stageId: number) => {
    if (!queuedEndActivity) return;

    const newQueue = queuedEndActivity.filter((stage) => {
      return stage.activityId !== stageId;
    });

    setQueuedEndActivity(newQueue);
  };

  const endStageMutation = useMutation({
    mutationFn: endStage,
    onSuccess: (response, request) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        removeActivityFromEndQueue(request.stageId);
        Alert.alert('Sucesso', response.return[0]);
      } else {
        removeActivityFromEndQueue(request.stageId);
        Alert.alert('Erro', response.return.message);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendQueuedEndActivities = () => {
    setIsSyncFinished(false);
    if (!queuedEndActivity) return;
    if (queuedEndActivity.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedEndActivity.forEach((activity, index) => {
        const payload = {
          stageId: activity.activityId,
          manPowerId: activity.manPowerId,
        };
        endStageMutation.mutate(payload);

        const isTheLastActivity = index === queuedEndActivity.length - 1;
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
    endStageMutation,
    addActivityToEndQueue,
    sendQueuedEndActivities,
  };
};

export default useEndStage;
