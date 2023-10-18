export interface EditedSymptoms {
  id: number;
  st?: number | boolean;
  description?: string;
}
export interface EditedMaintenanceOrder {
  counter: number;
  end_prev_date: string;
  end_prev_hr: string;
  id: number;
  latitude: string | null;
  longitude: string | null;
  obs: string;
  service_type: string;
  start_prev_date: string;
  start_prev_hr: string;
  symptoms: EditedSymptoms[];
  asset_code: string;
}
