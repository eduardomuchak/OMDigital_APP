export interface Operation {
  groupBranch: string;
  maintenanceController: string;
  operationCode: number;
  branch: string;
  company: string;
  operation: string;
  edit: null;
  datetime: null;
  resp_id: null;
}

export interface OperationByID {
  operationCode: number;
  operation: string;
}
