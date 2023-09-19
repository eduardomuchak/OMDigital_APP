import { Stage } from '../../../POST/Stages/stages.interface';
import { Symptom } from '../../../POST/Symptoms/symptom.interface';

// export interface MaintenanceOrderList {
//   id: number;
//   asset_code: string;
//   counter: number;
//   outsourced: number;
//   external: number;
//   found_fail: number;
//   tire_movimentation: number;
//   branch_select: number;
//   branch: string;
//   service_type: string;
//   service_code: string;
//   sequence: number | null;
//   status: number;
//   start_prev_date: string;
//   start_prev_hr: string;
//   end_prev_date: string;
//   end_prev_hr: string;
//   start_date: string | null;
//   start_hr: string | null;
//   end_date: string | null;
//   end_hr: string | null;
//   obs: string;
//   protheus: number;
//   os_protheus: string | null;
//   datetime: string;
//   resp_id: number;
//   st: number;
//   asset_year: number;
//   asset_brand: string;
//   asset_plate: string;
//   asset_type: string;
//   asset_maintenance_controller: string;
//   asset_family_name: string;
//   asset_operation_code: number;
//   asset_family: string;
//   service_charac: string;
//   service_maintenance: string;
//   service_description: string;
//   symptoms: Symptom.SymptomList[];
//   stages: Stage.StagesList[];
// }

export enum Service {
  C = 'C',
  P = 'P',
}

export enum ServiceCode {
  Corret = 'CORRET',
  Empty = '',
  Preven = 'PREVEN',
}

export interface ReturnOrder {
  status: string;
  message: string;
  serviceOrder?: ServiceOrder;
}

export interface ServiceOrder {
  branch: string;
  serviceOrder: string;
  maintenancePlan: string;
  type: string;
  assetCode: string;
  serviceCode: ServiceCode;
  sequence: string;
}

export interface ReturnSymptom {
  status: string;
  message: string;
}

export interface BranchObj {
  name: string;
  branch: string;
  company: string;
  st: boolean | null;
}
export interface MaintenanceOrderList {
  id: number;
  request: number;
  asset_code: string;
  operation_code: null | string;
  counter: number;
  latitude: null | string;
  longitude: null | string;
  outsourced: number;
  external: number;
  found_fail: number | null;
  tire_movimentation: number;
  branch_select: number;
  branch: string;
  service_type: Service;
  service_code: ServiceCode;
  sequence: number | null;
  status: number;
  start_prev_date: Date | null;
  start_prev_hr: null | string;
  end_prev_date: Date | null;
  end_prev_hr: null | string;
  start_date: Date | null;
  start_hr: null | string;
  end_date: Date | null;
  end_hr: null | string;
  obs: null | string;
  protheus: number;
  return_order: ReturnOrder | null;
  return_symptom: ReturnSymptom | null;
  return_stage: null;
  os_protheus: null | string;
  datetime: Date;
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
  service_charac: Service | null;
  service_maintenance: null | string;
  service_description: null | string;
  symptoms: Symptom.SymptomList[];
  stages: Stage.StagesList[];
  branch_obj: BranchObj;
}
