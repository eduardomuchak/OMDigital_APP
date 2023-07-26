import { api } from "../../api";

export const pauseStage = async (stageId: number) => {
  const response = await api.get(`/maintenance/pauseMainOrderStage/${stageId}`);
  return response.data;
};