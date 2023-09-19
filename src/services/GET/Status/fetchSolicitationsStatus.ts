import { api } from '../../api';
import { Status } from './status.interface';

export async function fetchSolicitationsStatus(): Promise<Status[]> {
  try {
    const { data } = await api.get(`maintenance/listRequestStatus`);
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
