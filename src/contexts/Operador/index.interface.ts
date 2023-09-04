import { OM } from '../../interfaces/om-context.interface';
import { Operation } from '../../services/GET/Operations/operation.interface';
import { StatusWithBgColor } from '../../services/GET/Status/status.interface';
import { IOperadorFilter } from '../OperadorFilter/index.interface';

export namespace IOperadorContext {
  export interface AppData {
    allMaintenanceOrders: OM.MaintenanceOrderInfo[];
    filteredMaintenanceOrders: OM.MaintenanceOrderInfo[];
    statusOMs: StatusWithBgColor[];
    allOperations: Operation[];
    filterConfig: IOperadorFilter.FilterConfig;
  }

  export type UseReducerAction =
    | { type: 'SET_ALL_OMS'; payload: OM.MaintenanceOrderInfo[] }
    | { type: 'SET_FILTER_CONFIG'; payload: IOperadorFilter.FilterConfig }
    | { type: 'SET_FILTERED_OMS'; payload: OM.MaintenanceOrderInfo[] }
    | { type: 'SET_OM_STATUS'; payload: StatusWithBgColor[] }
    | { type: 'SET_ALL_OPERATIONS'; payload: Operation[] };

  export interface OperadorContextData {
    operadorDataState: AppData;
    dispatchOperadorData: React.Dispatch<UseReducerAction>;
  }
}
