import { api } from '../../api';

export const pauseStage = async (
  stageId: number,
  manPowerId: string | null | undefined,
) => {
  const response = await api.get(
    `/maintenance/pauseMainOrderStage/${stageId}/${manPowerId}}`,
  );
  return response.data;
};
