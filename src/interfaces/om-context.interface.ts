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
    atividades: Activity[];
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

  export interface Symptom {
    id: number;
    descricao: string;
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
