import { api } from '../../api';
import { Solicitations } from './solicitations.interface';

export async function listUserRequestById(
  employyeeId: number,
): Promise<Solicitations.Fetch[]> {
  try {
    const { data } = await api.get(
      `maintenance/listUserRequest/${employyeeId}`,
    );
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
