import { api } from '../../api';
import { DeleteMaintenanceOrder } from './index.interface';

export const deleteMaintenanceOrderAPI = async (
  id: number,
): Promise<DeleteMaintenanceOrder.Response> => {
  const response = await api.delete(
    `/maintenance/deleteMaintenanceOrder/${id}`,
  );
  return response.data;
};
