export namespace Activity {
  export interface ActivityCardProps {
    activity: {
      id: number;
      name: string;
      startDate: string;
      endDate: string;
      status: string;
      images?: string[] | null;
    };
  }

  export interface Activity {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
    images?: string[] | null;
  }

  export interface OperationInfo {
    id: number;
    codigoBem: string;
    ordemManutencao: string;
    operacao: string;
    paradaReal: string;
    prevFim: string;
    status: string;
  }
}
