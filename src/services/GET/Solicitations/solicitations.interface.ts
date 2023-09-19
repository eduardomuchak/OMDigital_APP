export namespace Solicitations {
  export interface Fetch {
    id: number;
    status: number;
    asset_code: string;
    counter: number;
    report: string;
    dismiss_report: null;
    maintenance_order_id: number;
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
    images: any;
  }
}
