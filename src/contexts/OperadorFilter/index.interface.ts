import { OM } from '../../interfaces/om-context.interface';

export namespace IOperadorFilter {
  export interface FilterConfig {
    selectedStatus: number[];
    selectedOperations: number[];
    assetCode: string;
    selectedServiceOrderType: string;
    startPeriod: string;
    endPeriod: string;
  }

  // export interface StatusFilter {
  //   id: number;
  //   description: string;
  //   color: string;
  //   isChecked: boolean;
  // }

  export interface MultipleSelectOption {
    value: number;
    label: string;
  }

  export interface DateSection {
    startPeriod: Date;
    endPeriod: Date;
    setStartPeriod: React.Dispatch<React.SetStateAction<Date>>;
    setEndPeriod: React.Dispatch<React.SetStateAction<Date>>;
  }

  export interface FilterContextData {
    // allStatus: StatusFilter[];
    multipleSelectOperationOptions: MultipleSelectOption[];
    multipleSelectStatusOptions: MultipleSelectOption[];
    selectedStatus: number[];
    setSelectedStatus: React.Dispatch<React.SetStateAction<number[]>>;
    filterMaintenanceOrdersByStatus: () => OM.MaintenanceOrderInfo[];
    filterMaintenanceOrdersByOperations: () => OM.MaintenanceOrderInfo[];
    selectedOperations: number[];
    setSelectedOperations: React.Dispatch<React.SetStateAction<number[]>>;
    // allOperations: Operation[];
    assetCode: string;
    setAssetCode: React.Dispatch<React.SetStateAction<string>>;
    selectedServiceOrderType: string;
    setSelectedServiceOrderType: React.Dispatch<React.SetStateAction<string>>;
    serviceOrderTypeOptions: string[];
    dateSection: DateSection;
    handleConfirmFilter: () => Promise<void>;
    getFilterDataFromAsyncStorage: () => void;
  }
}
