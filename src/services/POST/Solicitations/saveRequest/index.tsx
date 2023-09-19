import { api } from '../../../api';
import { SaveRequest } from './saveRequest.interface';

export const saveRequest = async (payload: SaveRequest) => {
  const formattedPayload = new FormData();
  formattedPayload.append('asset_code', payload.asset_code);
  formattedPayload.append('counter', payload.counter.toString());
  formattedPayload.append('report', payload.report.toString());
  formattedPayload.append('resp_id', payload.resp_id.toString());
  formattedPayload.append('status', payload.status.toString());

  const response = await api.post(
    '/maintenance/saveRequest',
    formattedPayload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
};
