import { createContext, useEffect, useMemo, useState } from 'react';
import { OM } from '../interfaces/om-context.interface';
import { OMMock } from '../mocks/om';
import { apiDeleteStage } from '../services/DELETE/Stages';
import { fetchOMFromAPI } from '../services/GET/OMs/fetchAllOms/fetchOM';
import { MaintenanceOrderList } from '../services/GET/OMs/fetchAllOms/om.interface';
import { fetchOperationsFromAPI } from '../services/GET/Operations/fetchOperations';
import { Operation } from '../services/GET/Operations/operation.interface';
import { endStage } from '../services/GET/Stages/endStage';
import { pauseStage } from '../services/GET/Stages/pauseStage';
import { startStage } from '../services/GET/Stages/startStage';
import { fetchMainOrderStatus } from '../services/GET/Status/fetchMaintenanceOrdersStatus';
import { fetchStagesStatus } from '../services/GET/Status/fetchStagesStatus';
import { StatusWithBgColor } from '../services/GET/Status/status.interface';
import { createNewMaintenanceOrder } from '../services/POST/OMs/createNewMaintenanceOrder.ts';
import { newMaintenanceOrder } from '../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';
import { createNewMaintenanceOrderStage } from '../services/POST/Stages';
import { Stage } from '../services/POST/Stages/stages.interface';
import { createNewSymptom } from '../services/POST/Symptoms';
import { Symptom } from '../services/POST/Symptoms/symptom.interface';
import {
  handleStageStatusColor,
  handleStatusColor,
} from '../utils/handleStatusColor';
import { maintenanceOrderMapper } from '../utils/maintenanceOrderMapper';

interface OMContextData {
  om: OM.MaintenanceOrderInfo[];
  mockFetchOM: () => Promise<OM.MaintenanceOrderInfo[]>;
  setOm: React.Dispatch<React.SetStateAction<OM.MaintenanceOrderInfo[]>>;
  createNewOM: (om: OM.MaintenanceOrderInfo) => void;
  createNewOMAPI: (om: newMaintenanceOrder) => void;
  createNewStage: (stage: Stage.CreateStage) => void;
  cancelOM: (omId: number) => void;
  fetchOM: () => void;
  maintenanceOrders: MaintenanceOrderList[];
  mappedMaintenanceOrder: OM.MaintenanceOrderInfo[];
  statusLegendInfo: StatusWithBgColor[];
  registerNewSymptom: (symptom: Symptom.CreateNewSymptom) => void;
  deleteStage: (stageId: string) => void;
  handleLegendStageStatus: () => void;
  statusLegendStageInfo: StatusWithBgColor[];
  initiateStage: (stageId: number) => void;
  pauseMainOrderStage: (stageId: number) => void;
  endMainOrderStage: (stageId: number) => void;
  operations: Operation[];
  handleOperations: () => void;
}

export const OMContext = createContext<OMContextData>({} as OMContextData);

interface OMProviderProps {
  children: React.ReactNode;
}

export function OMContextProvider({ children }: OMProviderProps) {
  const [om, setOm] = useState<OM.MaintenanceOrderInfo[]>(OMMock);
  const [render, setRender] = useState(false);

  const [operations, setOperations] = useState<Operation[]>([]);

  const [maintenanceOrders, setMaintenanceOrders] = useState<
    MaintenanceOrderList[]
  >([]);

  const [statusLegendInfo, setStatusLegendInfo] = useState<StatusWithBgColor[]>(
    [],
  );

  const [statusLegendStageInfo, setStatusLegendStageInfo] = useState<
    StatusWithBgColor[]
  >([]);

  async function mockFetchOM(): Promise<OM.MaintenanceOrderInfo[]> {
    return new Promise((resolve) => {
      resolve(OMMock);
    });
  }

  async function fetchOM() {
    try {
      const response = await fetchOMFromAPI();
      setMaintenanceOrders(response);
    } catch (error) {
      console.error(error);
    }
  }

  function createNewOM(newOM: OM.MaintenanceOrderInfo) {
    setOm((currentOm) => [...currentOm, newOM]);
  }

  async function createNewOMAPI(newOM: newMaintenanceOrder) {
    try {
      const response = await createNewMaintenanceOrder(newOM);
    } catch (error) {
      console.error(error);
    }
    setRender(!render);
  }

  async function createNewStage(stage: Stage.CreateStage) {
    try {
      await createNewMaintenanceOrderStage(stage);
    } catch (error) {
      console.error(error);
    }
    setRender(!render);
  }

  async function initiateStage(stageId: number) {
    try {
      await startStage(stageId);
      setRender(!render);
    } catch (error) {
      console.error(error);
    }
  }

  async function pauseMainOrderStage(stageId: number) {
    try {
      await pauseStage(stageId);
      setRender(!render);
    } catch (error) {
      console.error(error);
    }
  }

  async function endMainOrderStage(stageId: number) {
    try {
      await endStage(stageId);
      setRender(!render);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteStage(stageId: string) {
    try {
      const response = await apiDeleteStage(stageId);
    } catch (error) {
      console.error(error);
    }
    setRender(!render);
  }

  function cancelOM(omId: number) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      newOm.status = 'Cancelada';
      return [...currentOm];
    });
  }

  async function handleLegendStatus() {
    const response = await fetchMainOrderStatus();

    const statusLegendWithColors = response.map((item) => ({
      ...item,
      color: handleStatusColor(item),
    }));

    setStatusLegendInfo(statusLegendWithColors);
  }

  async function handleLegendStageStatus() {
    const response = await fetchStagesStatus();
    const statusLegendWithColors = response.map((item) => ({
      ...item,
      color: handleStageStatusColor(item.description),
    }));

    setStatusLegendStageInfo(statusLegendWithColors);
  }

  async function registerNewSymptom(symptom: Symptom.CreateNewSymptom) {
    await createNewSymptom(symptom);
    setRender(!render);
  }

  async function handleOperations() {
    const operations = await fetchOperationsFromAPI();
    setOperations(operations);
  }

  useEffect(() => {
    handleLegendStatus();
    handleOperations();
  }, []);

  useEffect(() => {
    fetchOM();
  }, [render]);

  const mappedMaintenanceOrder = useMemo(() => {
    return maintenanceOrderMapper(maintenanceOrders);
  }, [maintenanceOrders]);

  const omContextData: OMContextData = {
    om,
    mockFetchOM,
    setOm,
    createNewOM,
    createNewOMAPI,
    createNewStage,
    deleteStage,
    cancelOM,
    fetchOM,
    maintenanceOrders,
    mappedMaintenanceOrder,
    statusLegendInfo,
    registerNewSymptom,
    handleLegendStageStatus,
    statusLegendStageInfo,
    initiateStage,
    pauseMainOrderStage,
    endMainOrderStage,
    operations,
    handleOperations,
  };

  return (
    <OMContext.Provider value={omContextData}>{children}</OMContext.Provider>
  );
}
