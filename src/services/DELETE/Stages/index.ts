import { api } from "../../api";
import { DeleteStages } from "./inteface";

export const apiDeleteStage = async (
  stageId: string
): Promise<DeleteStages.Response> => {
  const response = await api.delete(
    `/maintenance/deleteMainOrderStage/${stageId}`
  );
  return response.data;
};
