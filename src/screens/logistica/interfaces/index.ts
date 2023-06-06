import { Dispatch, SetStateAction } from "react";

export namespace Logistica {
  export interface StatusFilterStateOptions {
    todas: boolean;
    abertas: boolean;
    aguardando: boolean;
    concluidas: boolean;
    canceladas: boolean;
    [key: string]: boolean;
  }

  export interface Operation {
    id: number;
    name: string;
  }

  export interface OperationState {
    showAll: boolean;
    [key: string]: boolean;
  }

  export interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
      pickedStatus: StatusFilterStateOptions,
      pickedOperation: OperationState[]
    ) => void;
    allStatus: StatusFilterStateOptions;
    isOperador?: boolean;
    startPeriod?: Date;
    endPeriod?: Date;
    setStartPeriod?: Dispatch<SetStateAction<Date>>;
    setEndPeriod?: Dispatch<SetStateAction<Date>>;
    handleChangeCodigoBem: (codigoBem: string) => void;
    codigoBem: string;
  }

  export interface OperationsFilterOptionsProps {
    changeOperation: Dispatch<SetStateAction<OperationState[]>>;
    operations: OperationState[];
  }

  export interface OperationsFilterOptionsProps {
    changeOperation: Dispatch<SetStateAction<OperationState[]>>;
    operations: OperationState[];
  }

  export interface FilterOptionsProps {
    changeStatus: (status: StatusFilterStateOptions) => void;
    allStatus: StatusFilterStateOptions;
  }
}
