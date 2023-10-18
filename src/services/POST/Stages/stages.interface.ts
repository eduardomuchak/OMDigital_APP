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
  export interface StagesList {
    asset_code: string;
    datetime: string;
    description: string;
    end_date: string;
    end_hr: string;
    id: number;
    images: FetchImage[];
    maintenance_order_id: number;
    man_power_id: null | number;
    mo_status: number;
    obs: null | string;
    resp_id: number;
    service_code: string;
    service_type: string;
    st: number;
    stage_protheus: string;
    start_date: string;
    start_hr: string;
    status: number;
    task_protheus: string;
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
