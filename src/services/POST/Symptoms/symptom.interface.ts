export namespace Symptom {
  export interface CreateNewSymptom {
    maintenance_order_id: number;
    description: string;
    resp_id: number;
  }

  export interface SymptomList {
    id: number;
    maintenance_order_id: number;
    description: string;
    symptom_protheus: null | string;
    datetime: string;
    resp_id: number;
    st: number;
    asset_code: string;
    service_type: string;
    service_code: string;
    status: number;
  }
}
