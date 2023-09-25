import { api } from '../../../api';
import { EndMaintenanceOrder } from './index.interface';

export const endMaintenanceOrderAPI = async (
  id: string | number,
): Promise<EndMaintenanceOrder.Response> => {
  const response = await api.get(`/maintenance/endMaintenanceOrder/${id}`);
  return response.data;
};
