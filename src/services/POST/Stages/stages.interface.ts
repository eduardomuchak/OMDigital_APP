export namespace Stage {
  export interface Image {
    name: (string | undefined)[];
    tmp_name: (string | undefined)[];
    base64: string[];
  }

  export interface FetchImage {
    name: string;
    path: string;
  }

  export interface Images {
    name: string;
    path: string;
  }
  export interface StagesList {
    id: number;
    maintenance_order_id: number;
    status: number;
    description: string;
    man_power_id: string;
    start_prev_date: string;
    start_prev_hr: string;
    end_prev_date: string;
    end_prev_hr: string;
    start_datetime: string;
    start_pause_datetime: string;
    end_pause_datetime: string | null;
    end_datetime: string | null;
    task_protheus: string | null;
    stage_protheus: string | null;
    obs: string | null;
    datetime: string;
    alt_id: number;
    resp_id: number;
    st: number;
    executor_name: string;
    asset_code: string;
    service_type: string;
    service_code: string;
    mo_status: number;
    images: Images[];
  }
  export interface StagesListProps {
    stage: StagesList;
  }

  export interface CreateStage {
    maintenance_order_id: number;
    description: string;
    obs: string;
    start_date: string | null;
    start_hr: string | null;
    end_date: string | null;
    end_hr: string | null;
    resp_id: number;
    images?: Image;
  }
}
