export namespace NewMaintenanceOrder {
  export interface Image {
    name: (string | undefined)[];
    tmp_name: (string | undefined)[];
    base64: string[];
  }
  export interface Symptom {
    id: number | null;
    description: string;
    images?: Image;
  }

  export interface Payload {
    asset_code: string;
    counter: number;
    latitude: number;
    longitude: number;
    service_type: string;
    status: number;
    start_prev_date: string;
    start_prev_hr: string;
    end_prev_date: string;
    end_prev_hr: string;
    obs: string;
    resp_id: number;
    symptoms: Symptom[];
  }
}
