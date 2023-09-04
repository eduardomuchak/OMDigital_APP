import React, { createContext, useContext, useEffect, useState } from 'react';
import { useOperador } from '../../hooks/useOperador';
import { OM } from '../../interfaces/om-context.interface';
import { storage } from '../../lib/mmkv/storage';
import { IOperadorFilter } from './index.interface';

const FilterContext = createContext<IOperadorFilter.FilterContextData>(
  {} as IOperadorFilter.FilterContextData,
);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    operadorDataState: { allMaintenanceOrders, statusOMs, allOperations },
    dispatchOperadorData,
  } = useOperador();

  // * Status Section
  const [multipleSelectStatusOptions, setMultipleSelectStatusOptions] =
    useState<IOperadorFilter.MultipleSelectOption[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);

  const formattedStatus = () => {
    const sortedStatus = statusOMs.sort((a, b) =>
      a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1,
    );
    const formattedStatus = sortedStatus.map((status) => ({
      value: status.id,
      label: status.description,
    }));

    setMultipleSelectStatusOptions(formattedStatus);
  };

  const filterMaintenanceOrdersByStatus = (): OM.MaintenanceOrderInfo[] => {
    const allStatusCopy = [...statusOMs];
    const allOrdersCopy = [...allMaintenanceOrders];

    if (selectedStatus.length === 0) {
      return allOrdersCopy;
    }

    const onlyCheckedStatus = allStatusCopy.filter((status) =>
      selectedStatus.includes(status.id),
    );

    const filteredOrders = allOrdersCopy.filter((order) => {
      const operation = onlyCheckedStatus.find(
        (status) => status.description === order.status,
      );
      return operation;
    });

    return filteredOrders;
  };

  // * Asset Code Section
  const [assetCode, setAssetCode] = useState('');

  // * Operations Section
  const [multipleSelectOperationOptions, setMultipleSelectOperationOptions] =
    useState<IOperadorFilter.MultipleSelectOption[]>([]);
  const [selectedOperations, setSelectedOperations] = useState<number[]>([]);

  const formattedOperations = () => {
    const sortedOperations = allOperations.sort((a, b) =>
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

      const filterData = {
        selectedStatus,
        selectedOperations,
        assetCode,
        selectedServiceOrderType,
        startPeriod: startPeriod.toISOString(),
        endPeriod: endPeriod.toISOString(),
      };

      storage.set('operadorFilterConfig', JSON.stringify(filterData));

      dispatchOperadorData({
        type: 'SET_FILTER_CONFIG',
        payload: filterData,
      });
      dispatchOperadorData({
        type: 'SET_FILTERED_OMS',
        payload: omByPeriod,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // * Get Filter Data from AsyncStorage
  const getFilterDataFromAsyncStorage = () => {
    try {
      const storedFilterData = storage.getString('operadorFilterConfig');
      if (storedFilterData !== undefined) {
        const filterData: IOperadorFilter.FilterConfig =
          JSON.parse(storedFilterData);
        setSelectedStatus(filterData.selectedStatus);
        setSelectedOperations(filterData.selectedOperations);
        setAssetCode(filterData.assetCode);
        setSelectedServiceOrderType(filterData.selectedServiceOrderType);
        setStartPeriod(new Date(filterData.startPeriod));
        setEndPeriod(new Date(filterData.endPeriod));
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
    // setAllOperations(operations);
    formattedOperations();
  }, [allOperations]);

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
        // allStatus,
        // allOperations,
        selectedStatus,
        setSelectedStatus,
        multipleSelectStatusOptions,
        selectedOperations,
        setSelectedOperations,
        multipleSelectOperationOptions,
        filterMaintenanceOrdersByStatus,
        filterMaintenanceOrdersByOperations,
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
