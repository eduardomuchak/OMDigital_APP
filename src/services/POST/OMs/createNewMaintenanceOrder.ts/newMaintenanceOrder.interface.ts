export interface newMaintenanceOrder {
  // id: string | null;
  asset_code: string;
  counter: number;
  service_type: string;
  status: number;
  start_prev_date: string;
  start_prev_hr: string;
  end_prev_date: string;
  end_prev_hr: string;
  obs: string;
  resp_id: number;
}
