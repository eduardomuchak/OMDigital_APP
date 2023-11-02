import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { pauseStage } from '../../../../services/POST/Stages/pauseStage';

interface HookParams {
  activityId: number;
  manPowerId: string | null;
}

const usePauseStage = ({ activityId, manPowerId }: HookParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => pauseStage(activityId, manPowerId),

    onSuccess: (response) => {
      const isStatusTrue = response.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        Alert.alert('Sucesso', response.return[0]);
      } else {
        Alert.alert('Erro', response.return.message);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  return { pauseStageMutation: mutation };
};

export default usePauseStage;
