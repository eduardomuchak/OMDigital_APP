import { OM } from "../interfaces/om-context.interface";
import { MaintenanceOrderList } from "../services/GET/OMs/fetchAllOms/om.interface";
import { formatMaintenanceOrderStatus } from "./formatMaintenanceOrderStatus";

export function maintenanceOrderMapper(
  maintenanceOrder: MaintenanceOrderList[]
): OM.MaintenanceOrderInfo[] {
  const mapped = maintenanceOrder.map((order) => ({
    id: order.id,
    criadaEm: order.datetime,
    codigoBem: order.asset_code,
    ordemManutencao: order.id.toString(),
    operacao: order.asset_operation_code,
    paradaReal: order.start_prev_date + "T" + order.start_prev_hr + ".000Z",
    prevFim: order.end_prev_date + "T" + order.end_prev_hr + ".000Z",
    status: formatMaintenanceOrderStatus(order.status)!,
    latitude: "",
    longitude: "",
    localDeManutencao: "",
    controlador: order.asset_maintenance_controller,
    telefone: "",
    atividades: order.stages,
    sintomas: order.symptoms,
    contador: order.counter,
    tipo: order.service_type === "C" ? "Corretiva" : "Preventiva",
    dataFim: order.end_date + "T" + order.end_hr + ".000Z",
    comentario: order.obs,
  }));

  return mapped;
}
