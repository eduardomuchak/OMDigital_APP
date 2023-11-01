import { api } from '../../api';

export async function acceptRequestAPI(requestId: number) {
  try {
    const response = await api.get(`maintenance/acceptRequest/${requestId}`);
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
