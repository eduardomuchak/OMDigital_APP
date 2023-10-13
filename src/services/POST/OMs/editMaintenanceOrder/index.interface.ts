import { ListMaintenanceOrder } from '../../../GET/Maintenance/listMaintenanceOrderById/interface';

export interface EditedMaintenanceOrder {
  id: number | string;
  symptoms: ListMaintenanceOrder.Symptoms[];
}
