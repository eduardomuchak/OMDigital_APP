export interface OMMockProps {
  id: number;
  codigoBem: string;
  ordemManutencao: string;
  operacao: string;
  paradaReal: string;
  prevFim: string;
  status: string;
  tipo: string;
}

export interface CheckboxProps {
  isChecked: boolean;
  label: string;
  value: string;
}

interface StatusProp {
  allStatus: CheckboxProps[];
  setAllStatus: Function;
}

interface OperationsProp {
  allOperations: CheckboxProps[];
  setAllOperations: Function;
}

interface PeriodProps {
  startPeriod: Date;
  endPeriod: Date;
  setStartPeriod: React.Dispatch<React.SetStateAction<Date>>;
  setEndPeriod: React.Dispatch<React.SetStateAction<Date>>;
}

interface FilteredOrdersProps {
  filteredOrders: OMMockProps[];
  setFilteredOrders: React.Dispatch<React.SetStateAction<OMMockProps[]>>;
}

export interface FilterModalProps {
  status: StatusProp;
  operations: OperationsProp;
  period: PeriodProps;
  filtered: FilteredOrdersProps;
}
