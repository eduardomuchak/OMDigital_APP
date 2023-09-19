import { api } from '../../../api';
import { FetchPrincipalFooterDataResponse } from './index.interface';

export async function fetchPrincipalFooterData(
  userId: number,
): Promise<FetchPrincipalFooterDataResponse[]> {
  try {
    const { data } = await api.get(
      `maintenance/getPrincipalFooterData/${userId}`,
    );
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
