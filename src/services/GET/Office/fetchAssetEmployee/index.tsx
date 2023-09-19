import { api } from '../../../api';
import { FetchAssetEmployeeResponse } from './index.interface';

export async function fetchAssetEmployee(
  userId: number,
): Promise<FetchAssetEmployeeResponse[]> {
  try {
    const { data } = await api.get(`office/listAssetEmployee/${userId}`);
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
