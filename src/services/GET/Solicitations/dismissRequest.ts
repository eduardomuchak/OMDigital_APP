import { api } from '../../api';

export async function dismissRequestAPI(requestId: number): Promise<string> {
  try {
    const { data } = await api.get(`maintenance/dismissRequest/${requestId}`);
    const response = data.return;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
