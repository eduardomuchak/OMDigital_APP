import { api } from '../../api';

export const endStage = async (
  stageId: number,
  manPowerId: string | null | undefined,
) => {
  const response = await api.get(
    `/maintenance/endMainOrderStage/${stageId}/${manPowerId}`,
  );
  return response.data;
};
