import { api } from '../../../api';
import { EditedMaintenanceOrder } from './index.interface';

export const editMaintenanceOrder = async (payload: EditedMaintenanceOrder) => {
  const formattedPayload = new FormData();

  formattedPayload.append('id', payload.id.toString());
  formattedPayload.append('symptom', JSON.stringify(payload.symptoms));

  const response = await api.post(
    '/maintenance/saveMaintenanceOrder',
    formattedPayload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
};
