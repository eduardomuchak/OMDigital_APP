import { api } from '../../../api';
import { ListMaintenanceOrder } from './interface';

export async function listMaintenanceOrderById(
  id: number | string,
): Promise<ListMaintenanceOrder.MaintenanceOrder[]> {
  try {
    const { data } = await api.get(
      `maintenance/listUserMaintenanceOrder/${id}`,
    );
    const response = data.return.list;
    return response as ListMaintenanceOrder.MaintenanceOrder[];
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
