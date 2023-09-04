import React, { createContext, useMemo, useReducer } from 'react';
import { IOperadorFilter } from '../OperadorFilter/index.interface';
import { IOperadorContext } from './index.interface';

const operadorDataReducer = (
  state: IOperadorContext.AppData,
  action: IOperadorContext.UseReducerAction,
): IOperadorContext.AppData => {
  switch (action.type) {
    case 'SET_ALL_OMS':
      return { ...state, allMaintenanceOrders: action.payload };
    case 'SET_FILTERED_OMS':
      return { ...state, filteredMaintenanceOrders: action.payload };
    case 'SET_FILTER_CONFIG':
      return { ...state, filterConfig: action.payload };
    case 'SET_OM_STATUS':
      return { ...state, statusOMs: action.payload };
    case 'SET_ALL_OPERATIONS':
      return { ...state, allOperations: action.payload };
    default:
      return state;
  }
};

const OperadorContext = createContext<IOperadorContext.OperadorContextData>(
  {} as IOperadorContext.OperadorContextData,
);

const OperadorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [operadorDataState, dispatchOperadorData] = useReducer(
    operadorDataReducer,
    {
      allMaintenanceOrders: [],
      filteredMaintenanceOrders: [],
      statusOMs: [],
      allOperations: [],
      filterConfig: {} as IOperadorFilter.FilterConfig,
    },
  );

  const value = useMemo(
    () => ({
      operadorDataState,
      dispatchOperadorData,
    }),
    [operadorDataState, dispatchOperadorData],
  );

  return (
    <OperadorContext.Provider value={value}>
      {children}
    </OperadorContext.Provider>
  );
};

export { OperadorContext, OperadorProvider };
