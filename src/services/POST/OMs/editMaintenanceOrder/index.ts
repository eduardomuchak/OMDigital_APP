import { api } from '../../../api';
import { EditedMaintenanceOrder } from './index.interface';

export interface Payload {
  counter: number;
  end_prev_date: string;
  end_prev_hr: string;
  id: number;
  latitude: string;
  longitude: string;
  obs: string;
  service_type: string;
  start_prev_date: string;
  start_prev_hr: string;
  symptoms?: Symptoms[] | null;
}
export interface Symptoms {
  id: number;
  st: number | boolean;
}

export const editMaintenanceOrder = async (payload: EditedMaintenanceOrder) => {
  const formattedPayload = new FormData();

  formattedPayload.append('id', payload.id.toString());
  formattedPayload.append('asset_code', payload.asset_code);
  formattedPayload.append('counter', payload.counter.toString());
  formattedPayload.append('service_type', payload.service_type);
  formattedPayload.append('start_prev_date', payload.start_prev_date);
  formattedPayload.append('start_prev_hr', payload.start_prev_hr);
  formattedPayload.append('end_prev_date', payload.end_prev_date);
  formattedPayload.append('end_prev_hr', payload.end_prev_hr);
  formattedPayload.append('obs', payload.obs);
  formattedPayload.append('latitude', payload.latitude || 'null');
  formattedPayload.append('longitude', payload.longitude || 'null');
  formattedPayload.append('symptoms', JSON.stringify(payload.symptoms));

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
