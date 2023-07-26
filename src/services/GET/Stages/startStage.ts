import { api } from "../../api";

export const startStage = async (stageId: number) => {
  const response = await api.get(`/maintenance/startMainOrderStage/${stageId}`);
  return response.data;
};
