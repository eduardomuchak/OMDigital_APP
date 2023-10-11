export namespace ListMaintenanceOrder {
  export interface ApiResponse {
    status: boolean;
    return: Return;
  }
  export interface MaintenanceOrder {
    id: number;
    request: number;
    asset_code: string;
    operation_code: string | null;
    counter: number;
    latitude: null | string;
    longitude: null | string;
    outsourced: number;
    external: number;
    found_fail?: null;
    tire_movimentation: number;
    branch_select: number;
    branch: string;
    service_type: string;
    service_code?: null;
    sequence?: null;
    status: number;
    start_prev_date: string;
    start_prev_hr: string;
    end_prev_date: string;
    end_prev_hr: string;
    start_date?: null;
    start_hr?: null;
    end_date?: null;
    end_hr?: null;
    obs: string;
    protheus: number;
    return_order?: null;
    return_symptom?: null;
    return_stage?: null;
    os_protheus?: null;
    datetime: string;
    resp_id: number;
    st: number;
    asset_year: number;
    asset_brand: string;
    asset_plate: string;
    asset_type: string;
    asset_maintenance_controller: string;
    asset_family_name: string;
    asset_operation_code: number;
    asset_family: string;
    service_charac?: null;
    service_maintenance?: null;
    service_description?: null;
    symptoms: Symptoms[];
    stages: Stages[];
    branch_obj: BranchObj;
  }
  export interface Symptoms {
    id: number;
    maintenance_order_id: number;
    description: string;
    symptom_protheus?: null;
    datetime: string;
    resp_id: number;
    st: number;
    asset_code: string;
    service_type: string;
    service_code?: null;
    status: number;
    images?: Images[] | null;
  }
  export interface Images {
    name: string;
    path: string;
  }
  export interface Stages {
    id: number;
    maintenance_order_id: number;
    status: number;
    description: string;
    man_power_id?: null;
    start_date: string;
    start_hr: string;
    end_date: string;
    end_hr: string;
    task_protheus?: null;
    stage_protheus?: null;
    obs?: null;
    datetime: string;
    resp_id: number;
    st: number;
    asset_code: string;
    service_type: string;
    service_code?: null;
    mo_status: number;
    images?: any[] | null;
  }
  export interface BranchObj {
    name: string;
    branch: string;
    company: string;
    st: boolean;
  }
  export interface Return {
    list: MaintenanceOrder[] | null;
    pageSize: number;
    pageNumber: number;
    totalPages: number;
  }
}
