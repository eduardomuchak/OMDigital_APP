import { api } from '../../api';
import { Stage } from './stages.interface';

export const createNewMaintenanceOrderStage = async (
  payload: Stage.CreateStage,
) => {
  const formattedPayload = new FormData();
  formattedPayload.append(
    'maintenance_order_id',
    payload.maintenance_order_id.toString(),
  );
  formattedPayload.append('description', payload.description);
  formattedPayload.append('obs', payload.obs);
  formattedPayload.append('start_prev_date', payload.start_date || 'null');
  formattedPayload.append('start_prev_hr', payload.start_hr || 'null');
  formattedPayload.append('end_prev_date', payload.end_date || 'null');
  formattedPayload.append('end_prev_hr', payload.end_hr || 'null');
  formattedPayload.append('resp_id', payload.resp_id.toString());
  if (payload.images) {
    formattedPayload.append('images', JSON.stringify(payload.images));
  }

  const response = await api.post(
    '/maintenance/saveMainOrderStage',
    formattedPayload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response;
};
