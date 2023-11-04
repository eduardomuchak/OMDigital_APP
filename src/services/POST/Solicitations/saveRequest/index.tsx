import { api } from '../../../api';
import { SaveRequest } from './saveRequest.interface';

interface RequestIndex {
  requestIndex?: number;
}

export const saveRequest = async (payload: SaveRequest & RequestIndex) => {
  const formattedPayload = new FormData();
  formattedPayload.append('asset_code', payload.asset_code);
  formattedPayload.append('counter', payload.counter.toString());
  formattedPayload.append('report', payload.report.toString());
  formattedPayload.append('resp_id', payload.resp_id.toString());
  formattedPayload.append('status', payload.status.toString());
  if (payload.images) {
    formattedPayload.append('images', JSON.stringify(payload.images));
  }

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
