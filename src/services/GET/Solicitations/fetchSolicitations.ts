import { api } from '../../api';
import { Solicitations } from './solicitations.interface';

export async function fetchSolicitations(): Promise<Solicitations.Fetch[]> {
  try {
    const { data } = await api.get(`maintenance/listRequest`);
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
