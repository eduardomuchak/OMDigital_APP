import { createContext, useEffect, useState } from 'react';
import { OM } from '../interfaces/om-context.interface';
import { OMMock } from '../mocks/om';
import { apiDeleteStage } from '../services/DELETE/Stages';
import { fetchOMFromAPI } from '../services/GET/OMs/fetchAllOms/fetchOM';
import { MaintenanceOrderList } from '../services/GET/OMs/fetchAllOms/om.interface';
import { fetchAllStatus } from '../services/GET/Status/fetchAllStatus';
import { StatusWithBgColor } from '../services/GET/Status/status.interface';
import { createNewMaintenanceOrder } from '../services/POST/OMs/createNewMaintenanceOrder.ts';
import { newMaintenanceOrder } from '../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';
import { createNewSymptom } from '../services/POST/Symptoms';
import { Symptom } from '../services/POST/Symptoms/symptom.interface';
import { handleStatusColor } from '../utils/handleStatusColor';
import { maintenanceOrderMapper } from '../utils/maintenanceOrderMapper';

interface OMContextData {
  om: OM.MaintenanceOrderInfo[];
  mockFetchOM: () => Promise<OM.MaintenanceOrderInfo[]>;
  setOm: React.Dispatch<React.SetStateAction<OM.MaintenanceOrderInfo[]>>;
  createNewOM: (om: OM.MaintenanceOrderInfo) => void;
  createNewOMAPI: (om: newMaintenanceOrder) => void;
  createNewActivity: (activity: OM.Activity, omId: number) => void;
  deleteActivity: (activityId: number, omId: number) => void;
  pauseOrInitiateActivity: (
    activityId: number,
    omId: number,
    option: OM.Activity['status'],
  ) => void;
  cancelOM: (omId: number) => void;
  finishActivity: (
    activityId: number,
    omId: number,
    finishDate: string,
  ) => void;
  finishOM: (
    omId: number,
    finishDate: string,
    counter: number,
    comment: string | undefined,
  ) => void;
  fetchOM: () => void;
  maintenanceOrders: MaintenanceOrderList[];
  mappedMaintenanceOrder: OM.MaintenanceOrderInfo[];
  statusLegendInfo: StatusWithBgColor[];
  registerNewSymptom: (symptom: Symptom.CreateNewSymptom) => void;
  deleteStage: (stageId: string) => void;
}

export const OMContext = createContext<OMContextData>({} as OMContextData);

interface OMProviderProps {
  children: React.ReactNode;
}

export function OMContextProvider({ children }: OMProviderProps) {
  const [om, setOm] = useState<OM.MaintenanceOrderInfo[]>(OMMock);

  const [maintenanceOrders, setMaintenanceOrders] = useState<
    MaintenanceOrderList[]
  >([]);

  const [statusLegendInfo, setStatusLegendInfo] = useState<StatusWithBgColor[]>(
    [],
  );

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
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function createNewActivity(activity: OM.Activity, omId: number) {
    // setOm((currentOm) => {
    //   const omIndex = currentOm.findIndex((om) => om.id === omId);
    //   const newOm = currentOm[omIndex];
    //   newOm.atividades.push(activity);
    //   return [...currentOm];
    // });
  }

  function deleteActivity(activityId: number, omId: number) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      const activityIndex = newOm.atividades.findIndex(
        (activity) => activity.id === activityId,
      );
      newOm.atividades.splice(activityIndex, 1);
      return [...currentOm];
    });
  }

  async function deleteStage(stageId: string) {
    try {
      const response = await apiDeleteStage(stageId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function pauseOrInitiateActivity(
    activityId: number,
    omId: number,
    option: OM.Activity['status'],
  ) {
    // setOm((currentOm) => {
    //   const omIndex = currentOm.findIndex((om) => om.id === omId);
    //   const newOm = currentOm[omIndex];
    //   const activityIndex = newOm.atividades.findIndex(
    //     (activity) => activity.id === activityId
    //   );
    //   newOm.atividades[activityIndex].status = option;
    //   return [...currentOm];
    // });
  }

  function finishActivity(
    activityId: number,
    omId: number,
    finishDate: string,
  ) {
    // setOm((currentOm) => {
    //   const omIndex = currentOm.findIndex((om) => om.id === omId);
    //   const newOm = currentOm[omIndex];
    //   const activityIndex = newOm.atividades.findIndex(
    //     (activity) => activity.id === activityId
    //   );
    //   newOm.atividades[activityIndex].status = "Concluída";
    //   newOm.atividades[activityIndex].dataFimReal = finishDate;
    //   return [...currentOm];
    // });
  }

  function cancelOM(omId: number) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      newOm.status = 'Cancelada';
      return [...currentOm];
    });
  }

  function finishOM(
    omId: number,
    finishDate: string,
    counter: number,
    comment: string | undefined,
  ) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      newOm.status = 'Concluída';
      newOm.dataFim = finishDate;
      newOm.comentario = comment;
      newOm.contador = counter;
      return [...currentOm];
    });
  }

  async function handleLegendStatus() {
    const response = await fetchAllStatus();

    const statusLegendWithColors = response.map((item) => ({
      ...item,
      color: handleStatusColor(item.description),
    }));

    setStatusLegendInfo(statusLegendWithColors);
  }

  async function registerNewSymptom(symptom: Symptom.CreateNewSymptom) {
    await createNewSymptom(symptom);
  }

  useEffect(() => {
    async function fetchOM() {
      const data = await mockFetchOM();
      setOm(data);
    }

    handleLegendStatus();
    fetchOM();
  }, []);

  const mappedMaintenanceOrder = maintenanceOrderMapper(maintenanceOrders);

  const omContextData: OMContextData = {
    om,
    mockFetchOM,
    setOm,
    createNewOM,
    createNewOMAPI,
    createNewActivity,
    deleteActivity,
    pauseOrInitiateActivity,
    cancelOM,
    finishActivity,
    finishOM,
    fetchOM,
    maintenanceOrders,
    mappedMaintenanceOrder,
    statusLegendInfo,
    registerNewSymptom,
    deleteStage,
  };

  return (
    <OMContext.Provider value={omContextData}>{children}</OMContext.Provider>
  );
}
