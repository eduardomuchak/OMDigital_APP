import { api } from '../../api';
import { DeleteStages } from './inteface';

export const apiDeleteStage = async (
  stageId: string,
): Promise<DeleteStages.Response> => {
  try {
    const response = await api.delete(
      `/maintenance/deleteMainOrderStage/${stageId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error('Erro ao deleter uma etapa: ', error);
    throw error;
  }
};
