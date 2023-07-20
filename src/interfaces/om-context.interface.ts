import { Stage } from "../services/POST/Stages/stages.interface";

export namespace OM {
  export interface MaintenanceOrderInfo {
    id: number;
    criadaEm: string;
    codigoBem: string;
    ordemManutencao: string;
    operacao: number;
    paradaReal: string;
    prevFim: string;
    status: string;
    latitude: string;
    longitude: string;
    localDeManutencao?: string;
    controlador: string;
    telefone?: string;
    atividades: Stage.StagesList[];
    sintomas: Symptom[];
    contador: number;
    tipo: string;
    dataFim?: string;
    comentario?: string;
  }

  export interface MaintenanceOrderInfoAPI {
    id: null;
    asset_code: string;
    counter: string;
    service_type: string;
    status: string;
    start_prev_date: string;
    start_prev_hr: string;
    end_prev_date: string;
    end_prev_hr: string;
    obs: string;
    resp_id: number;
  }

  // export interface Symptom {
  //   id: number;
  //   descricao: string;
  // }

  export interface Symptom {
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

  export interface Activity {
    id: number;
    descricao: string;
    status:
      | 'Concluída'
      | 'Em andamento'
      | 'Atrasada'
      | 'Não iniciada'
      | 'Pausada';
    dataInicioPrevista: string;
    dataFimPrevista: string;
    images: string[];
    dataFimReal?: string;
    obs?: string;
  }

  export interface ActivityProps {
    activity: Activity;
  }
}
