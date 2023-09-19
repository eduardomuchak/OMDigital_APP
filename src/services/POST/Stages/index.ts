import { api } from "../../api";
import { Stage } from "./stages.interface";

export const createNewMaintenanceOrderStage = async (
  payload: Stage.CreateStage
) => {
  const formattedPayload = new FormData();
  formattedPayload.append(
    "maintenance_order_id",
    payload.maintenance_order_id.toString()
  );
  formattedPayload.append("description", payload.description);
  formattedPayload.append("start_date", payload.start_date);
  formattedPayload.append("start_hr", payload.start_hr);
  formattedPayload.append("end_date", payload.end_date);
  formattedPayload.append("end_hr", payload.end_hr);
  formattedPayload.append("resp_id", payload.resp_id.toString());

  const response = await api.post(
    "/maintenance/saveMainOrderStage",
    formattedPayload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};