import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { resumeStage } from '../../../../services/POST/Stages/resumeStage';

interface StartQueue {
  activityId: number;
  manPowerId: string | null | undefined;
}

const useResumeStage = () => {
  const queryClient = useQueryClient();

  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const [queuedResumeActivity, setQueuedResumeActivity] = useMMKVObject<
    StartQueue[]
  >('queuedResumeActivity');

  if (queuedResumeActivity === undefined) setQueuedResumeActivity([]);

  const addActivityToResumeQueue = ({ activityId, manPowerId }: StartQueue) => {
    if (!queuedResumeActivity) return;
    // Check if activity is already in queue
    const isActivityInQueue = queuedResumeActivity.find(
      (activity) => activity.activityId === activityId,
    );

    if (isActivityInQueue) return;

    setQueuedResumeActivity([
      ...queuedResumeActivity,
      {
        activityId,
        manPowerId,
      },
    ]);
  };

  const removeActivityFromResumeQueue = (stageId: number) => {
    if (!queuedResumeActivity) return;

    const newQueue = queuedResumeActivity.filter((stage) => {
      return stage.activityId !== stageId;
    });

    setQueuedResumeActivity(newQueue);
  };

  const resumeStageMutation = useMutation({
    mutationFn: resumeStage,
    onSuccess: (response, request) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        removeActivityFromResumeQueue(request.stageId);
        Alert.alert('Sucesso', response.return[0]);
      } else {
        removeActivityFromResumeQueue(request.stageId);
        Alert.alert('Erro', response.return.message);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const sendQueuedResumeActivities = () => {
    setIsSyncFinished(false);
    if (!queuedResumeActivity) return;
    if (queuedResumeActivity.length === 0) {
      setIsSyncFinished(true);
      return;
    } else {
      queuedResumeActivity.forEach((activity, index) => {
        const payload = {
          stageId: activity.activityId,
          manPowerId: activity.manPowerId,
        };
        resumeStageMutation.mutate(payload);

        const isTheLastActivity = index === queuedResumeActivity.length - 1;
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
    resumeStageMutation,
    addActivityToResumeQueue,
    sendQueuedResumeActivities,
  };
};

export default useResumeStage;
