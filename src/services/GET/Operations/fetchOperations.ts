import { api } from '../../api';
import { Operation } from './operation.interface';

export async function fetchOperationsFromAPI(): Promise<Operation[]> {
  try {
    const { data } = await api.get(`/office/listOperation`);
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
