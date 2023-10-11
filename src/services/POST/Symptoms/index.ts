import { api } from '../../api';
import { Symptom } from './symptom.interface';

export async function createNewSymptom(payload: Symptom.CreateNewSymptom) {
  const formattedPayload = new FormData();
  formattedPayload.append(
    'maintenance_order_id',
    payload.maintenance_order_id.toString(),
  );
  formattedPayload.append('description', payload.description);
  formattedPayload.append('resp_id', payload.resp_id.toString());
  if (payload.images) {
    formattedPayload.append('images', JSON.stringify(payload.images));
  }

  const response = await api.post(
    '/maintenance/saveMainOrderSymptom',
    formattedPayload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response;
}
