import { api } from "../../../api";
import { newMaintenanceOrder } from "./newMaintenanceOrder.interface";

export const createNewMaintenanceOrder = async (
  payload: newMaintenanceOrder
) => {
  const formattedPayload = new FormData();
  formattedPayload.append("asset_code", payload.asset_code);
  formattedPayload.append("counter", payload.counter.toString());
  formattedPayload.append("service_type", payload.service_type);
  formattedPayload.append("status", payload.status.toString());
  formattedPayload.append("start_prev_date", payload.start_prev_date);
  formattedPayload.append("start_prev_hr", payload.start_prev_hr);
  formattedPayload.append("end_prev_date", payload.end_prev_date);
  formattedPayload.append("end_prev_hr", payload.end_prev_hr);
  formattedPayload.append("symptom", payload.symptom);
  formattedPayload.append("resp_id", payload.resp_id.toString());

  const response = await api.post(
    "/maintenance/saveMaintenanceOrder",
    formattedPayload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};
