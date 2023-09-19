import { api } from '../../api';

export async function acceptRequestAPI(requestId: number): Promise<string> {
  try {
    const { data } = await api.get(`maintenance/acceptRequest/${requestId}`);
    const response = data.return;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
