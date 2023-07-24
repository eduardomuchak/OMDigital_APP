import { api } from "../../api";
import { Status } from "./status.interface";

export async function fetchStagesStatus(): Promise<Status[]> {
  try {
    const { data } = await api.get(`maintenance/listStageStatus`);
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}