import { api } from '../../api';

export async function dismissRequestAPI(requestId: number) {
  try {
    const response = await api.get(`maintenance/dismissRequest/${requestId}`);
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
