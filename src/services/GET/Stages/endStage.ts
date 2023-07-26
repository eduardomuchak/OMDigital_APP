import { api } from "../../api";

export const endStage = async (stageId: number) => {
  const response = await api.get(`/maintenance/endMainOrderStage/${stageId}`);
  return response.data;
};
