import { api } from "../../../api";
import { newMaintenanceOrder } from "./newMaintenanceOrder.interface";

export const createNewMaintenanceOrder = async (
  payload: newMaintenanceOrder
) => {
  const response = await api.post("/maintenance/saveMaintenanceOrder", payload);
  return response;
};
