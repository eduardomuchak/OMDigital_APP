import { api } from '../../api';
import { OperationByID } from './operation.interface';

export async function listOperationEmployee(
  employeeId: number | string,
): Promise<OperationByID[]> {
  try {
    const { data } = await api.get(`/user/listOperationEmployee/${employeeId}`);
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
