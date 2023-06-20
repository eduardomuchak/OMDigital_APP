export namespace OM {
  export interface MaintenanceOrderInfo {
    id: number;
    criadaEm: string;
    codigoBem: string;
    ordemManutencao: string;
    operacao: string;
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
