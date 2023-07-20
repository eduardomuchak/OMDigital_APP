export namespace Stage {
  export interface StagesList {
    id: number;
    maintenance_order_id: number;
    status: number;
    description: string;
    man_power_id: string;
    start_date: string;
    start_hr: string;
    end_date: string;
    end_hr: string;
    task_protheus: string;
    stage_protheus: string;
    datetime: string;
    resp_id: number;
    st: number;
    asset_code: string;
    service_type: string;
    service_code: string;
    mo_status: number;
  }

  export interface StagesListProps {
    stage: StagesList;
  }
}
