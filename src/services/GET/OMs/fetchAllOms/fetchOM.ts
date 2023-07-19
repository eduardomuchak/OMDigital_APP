import { api } from "../../../api";
import { MaintenanceOrderList } from "./om.interface";

export async function fetchOMFromAPI(): Promise<MaintenanceOrderList[]> {
  try {
    const { data } = await api.get(`maintenance/listMaintenanceOrder`);
    const response = data.return.list;
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
}
