import React, { createContext, useContext, useEffect, useState } from 'react';
import { useOperador } from '../hooks/useOperador';
import { OM } from '../interfaces/om-context.interface';
import { storage } from '../lib/mmkv/storage';
import { Operation } from '../services/GET/Operations/operation.interface';

interface StatusFilter {
  id: number;
  description: string;
  color: string;
  isChecked: boolean;
}

interface MultipleSelectOperation {
  value: number;
  label: string;
}

interface DateSection {
  startPeriod: Date;
  endPeriod: Date;
  setStartPeriod: React.Dispatch<React.SetStateAction<Date>>;
  setEndPeriod: React.Dispatch<React.SetStateAction<Date>>;
}

interface FilterContextData {
  // filteredMaintenanceOrders: OM.MaintenanceOrderInfo[];
  // setFilteredMaintenanceOrders: React.Dispatch<
  //   React.SetStateAction<OM.MaintenanceOrderInfo[]>
  // >;
  allStatus: StatusFilter[];
  multipleSelectOperationOptions: MultipleSelectOperation[];
  handleToggleCheckbox: (id: number, list: StatusFilter[]) => void;
  filterMaintenanceOrdersByStatus: () => OM.MaintenanceOrderInfo[];
  filterMaintenanceOrdersByOperations: () => OM.MaintenanceOrderInfo[];
  selectedOperations: number[];
  setSelectedOperations: React.Dispatch<React.SetStateAction<number[]>>;
  allOperations: Operation[];
  assetCode: string;
  setAssetCode: React.Dispatch<React.SetStateAction<string>>;
  selectedServiceOrderType: string;
  setSelectedServiceOrderType: React.Dispatch<React.SetStateAction<string>>;
  serviceOrderTypeOptions: string[];
  dateSection: DateSection;
  handleConfirmFilter: () => Promise<void>;
  getFilterDataFromAsyncStorage: () => Promise<void>;
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    operadorDataState: {
      allMaintenanceOrders,
      statusOMs,
      allOperations: operations,
    },
    dispatchOperadorData,
  } = useOperador();

  // * Status Section
  const [allStatus, setAllStatus] = useState<StatusFilter[]>([]);

  const formattedStatus = () => {
    const sortedStatusLegendInfo = statusOMs.sort((a, b) =>
      a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1,
    );
    const formattedStatus = [
      {
        id: 0,
        description: 'Todas',
        color: '#000000',
        isChecked: true,
      },
      ...sortedStatusLegendInfo.map((status) => {
        return {
          id: status.id,
          description: status.description,
          color: status.color,
          isChecked: true,
        };
      }),
    ];

    setAllStatus(formattedStatus);
  };

  const handleToggleCheckbox = (id: number, list: StatusFilter[]) => {
    const result = [...list];
    const allChecked = result.every((item) => item.isChecked);
    const itemIndex = result.findIndex((item) => item.id === id);

    if (itemIndex === 0) {
      // itemIndex === 0 is the "Todas" option
      result.forEach((item) => (item.isChecked = !allChecked));
    } else {
      // itemIndex > 0 is the other options
      result[itemIndex].isChecked = !result[itemIndex].isChecked;

      if (!result[itemIndex].isChecked) {
        result[0].isChecked = false;
      } else if (allChecked) {
        result[0].isChecked = true;
      }

      // If all other options are checked, check the "Todas" option too
      if (result.slice(1).every((item) => item.isChecked)) {
        result[0].isChecked = true;
      }
    }

    setAllStatus(result);
  };

  const filterMaintenanceOrdersByStatus = (): OM.MaintenanceOrderInfo[] => {
    const allStatusCopy = [...allStatus];
    const allOrdersCopy = [...allMaintenanceOrders];

    const isTodasOptionChecked = allStatusCopy[0]?.isChecked;
    const onlyCheckedStatus = allStatusCopy
      .splice(1, allStatus.length - 1)
      .filter((status) => status.isChecked);

    if (isTodasOptionChecked) {
      return allOrdersCopy;
    } else {
      const filteredOrders = allOrdersCopy.filter((order) => {
        const status = onlyCheckedStatus.find(
          (status) => status.description === order.status,
        );
        return status;
      });
      return filteredOrders;
    }
  };

  // * Asset Code Section
  const [assetCode, setAssetCode] = useState('');

  // * Operations Section
  const [allOperations, setAllOperations] = useState<Operation[]>([]);
  const [multipleSelectOperationOptions, setMultipleSelectOperationOptions] =
    useState<MultipleSelectOperation[]>([]);
  const [selectedOperations, setSelectedOperations] = useState<number[]>([]);

  const formattedOperations = () => {
    const sortedOperations = operations.sort((a, b) =>
      a.operation.toLowerCase() > b.operation.toLowerCase() ? 1 : -1,
    );
    const formattedOperations = sortedOperations.map((operation) => ({
      value: operation.operationCode,
      label: operation.operation,
    }));

    setMultipleSelectOperationOptions(formattedOperations);
  };

  const filterMaintenanceOrdersByOperations = (): OM.MaintenanceOrderInfo[] => {
    const allOperationsCopy = [...allOperations];
    const allOrdersCopy = [...allMaintenanceOrders];

    if (selectedOperations.length === 0) {
      return allOrdersCopy;
    }

    const onlyCheckedOperations = allOperationsCopy.filter((operation) =>
      selectedOperations.includes(operation.operationCode),
    );

    const filteredOrders = allOrdersCopy.filter((order) => {
      const operation = onlyCheckedOperations.find(
        (operation) => operation.operationCode === order.operacao,
      );
      return operation;
    });

    return filteredOrders;
  };

  // * Service Order Section
  const [selectedServiceOrderType, setSelectedServiceOrderType] = useState('');
  const [serviceOrderTypeOptions, setServiceOrderTypeOptions] = useState([
    'Preventiva',
    'Corretiva',
  ]);

  // * Date Section
  const [startPeriod, setStartPeriod] = useState(new Date());
  const [endPeriod, setEndPeriod] = useState(new Date());
  const dateSection = {
    startPeriod,
    endPeriod,
    setStartPeriod,
    setEndPeriod,
  };

  // * Confirm Filter Options
  const handleConfirmFilter = async () => {
    try {
      const omByStatus = filterMaintenanceOrdersByStatus();
      const omByOperations = filterMaintenanceOrdersByOperations();

      const omByStatusAndOperations = omByStatus.filter((om) =>
        omByOperations.includes(om),
      );

      const omByAssetCode = omByStatusAndOperations.filter((om) => {
        if (assetCode === '') {
          return om;
        }
        return om.codigoBem.includes(assetCode);
      });

      const omByServiceOrderType = omByAssetCode.filter((om) => {
        if (selectedServiceOrderType === '') {
          return om;
        }
        return om.tipo === selectedServiceOrderType;
      });

      const omByPeriod = omByServiceOrderType.filter((om) => {
        const omDate = new Date(om.criadaEm);
        return omDate >= startPeriod && omDate <= endPeriod;
      });

      dispatchOperadorData({
        type: 'SET_FILTERED_OMS',
        payload: omByPeriod,
      });
    } catch (error) {
      console.error(error);
    } finally {
      const filterData = {
        allStatus,
        selectedOperations,
        assetCode,
        selectedServiceOrderType,
        startPeriod: startPeriod.toISOString(),
        endPeriod: endPeriod.toISOString(),
      };
      storage.set('operadorFilterData', JSON.stringify(filterData));
    }
  };

  // * Get Filter Data from AsyncStorage
  const getFilterDataFromAsyncStorage = async () => {
    try {
      const filterData = JSON.parse(
        storage.getString('operadorFilterData') || '{}',
      );
      if (filterData !== null) {
        const {
          allStatus,
          selectedOperations,
          assetCode,
          selectedServiceOrderType,
          startPeriod,
          endPeriod,
        } = JSON.parse(filterData);
        setAllStatus(allStatus);
        setSelectedOperations(selectedOperations);
        setAssetCode(assetCode);
        setSelectedServiceOrderType(selectedServiceOrderType);
        setStartPeriod(new Date(startPeriod));
        setEndPeriod(new Date(endPeriod));
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleConfirmFilter();
    }
  };

  useEffect(() => {
    formattedStatus();
  }, [statusOMs]);

  useEffect(() => {
    setAllOperations(operations);
    formattedOperations();
  }, [operations]);

  useEffect(() => {
    if (allMaintenanceOrders.length > 0) {
      const dates = allMaintenanceOrders.map((order) =>
        new Date(order.criadaEm).getTime(),
      );
      const smallestDate = new Date(Math.min.apply(null, dates));
      const largestDate = new Date(Math.max.apply(null, dates));

      setStartPeriod(smallestDate);
      setEndPeriod(largestDate);
    }
  }, [allMaintenanceOrders]);

  return (
    <FilterContext.Provider
      value={{
        // filteredMaintenanceOrders,
        // setFilteredMaintenanceOrders,
        allStatus,
        allOperations,
        multipleSelectOperationOptions,
        handleToggleCheckbox,
        filterMaintenanceOrdersByStatus,
        filterMaintenanceOrdersByOperations,
        selectedOperations,
        setSelectedOperations,
        assetCode,
        setAssetCode,
        selectedServiceOrderType,
        setSelectedServiceOrderType,
        serviceOrderTypeOptions,
        dateSection,
        handleConfirmFilter,
        getFilterDataFromAsyncStorage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

function useFilter() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter must be used within an FilterProvider.');
  }

  return context;
}

export { FilterProvider, useFilter };
