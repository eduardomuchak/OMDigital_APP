import { api } from "../../api";

export const startStage = async (stageId: number) => {
  const response = await api.get(`/maintenance/startMainOrderStage/${stageId}`);
  console.log(response.data.message);
  return response.data;
};
