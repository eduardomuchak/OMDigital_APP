import { api } from '../../api';

export const startStage = async (
  stageId: number,
  manPowerId: string | null | undefined,
) => {
  const response = await api.get(
    `/maintenance/startMainOrderStage/${stageId}/${manPowerId}`,
  );
  return response.data;
};
