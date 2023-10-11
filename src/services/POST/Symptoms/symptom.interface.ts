export namespace Symptom {
  export interface Image {
    name: (string | undefined)[];
    tmp_name: (string | undefined)[];
    base64: string[];
  }
  export interface CreateNewSymptom {
    maintenance_order_id: number;
    description: string;
    resp_id: number;
    images?: Image;
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
