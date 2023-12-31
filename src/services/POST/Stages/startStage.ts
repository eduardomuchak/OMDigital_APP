import { api } from '../../api';

export const startStage = async ({
  stageId,
  manPowerId,
}: {
  stageId: number;
  manPowerId: string | null | undefined;
}) => {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getUTCFullYear().toString();
  const hour = now.getUTCHours().toString().padStart(2, '0');
  const minute = now.getUTCMinutes().toString().padStart(2, '0');

  const payload = {
    start_datetime: `${year}-${month}-${day} ${hour}:${minute}`,
  };

  const response = await api.post(
    `/maintenance/startMainOrderStage/${stageId}/${manPowerId}`,
    payload,
  );
  return response.data;
};
