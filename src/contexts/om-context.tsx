import { createContext, useEffect, useState } from "react";
import { OM } from "../interfaces/om-context.interface";
import { OMMock } from "../mocks/om";

interface OMContextData {
  om: OM.MaintenanceOrderInfo[];
  mockFetchOM: () => Promise<OM.MaintenanceOrderInfo[]>;
  setOm: React.Dispatch<React.SetStateAction<OM.MaintenanceOrderInfo[]>>;
  createNewOM: (om: OM.MaintenanceOrderInfo) => void;
  createNewActivity: (activity: OM.Activity, omId: number) => void;
  deleteActivity: (activityId: number, omId: number) => void;
  pauseActivity: (activityId: number, omId: number) => void;
}

export const OMContext = createContext<OMContextData>({} as OMContextData);

interface OMProviderProps {
  children: React.ReactNode;
}

export function OMContextProvider({ children }: OMProviderProps) {
  const [om, setOm] = useState<OM.MaintenanceOrderInfo[]>(OMMock);

  async function mockFetchOM(): Promise<OM.MaintenanceOrderInfo[]> {
    return new Promise((resolve) => {
      resolve(OMMock);
    });
  }

  function createNewOM(newOM: OM.MaintenanceOrderInfo) {
    setOm((currentOm) => [...currentOm, newOM]);
  }

  function createNewActivity(activity: OM.Activity, omId: number) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      newOm.atividades.push(activity);
      return [...currentOm];
    });
  }

  function deleteActivity(activityId: number, omId: number) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      const activityIndex = newOm.atividades.findIndex(
        (activity) => activity.id === activityId
      );
      newOm.atividades.splice(activityIndex, 1);
      return [...currentOm];
    });
  }

  function pauseActivity(activityId: number, omId: number) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      const activityIndex = newOm.atividades.findIndex(
        (activity) => activity.id === activityId
      );
      newOm.atividades[activityIndex].status = "Pausada";
      return [...currentOm];
    });
  };

  useEffect(() => {
    async function fetchOM() {
      const data = await mockFetchOM();
      setOm(data);
    }

    fetchOM();
  }, []);

  const omContextData: OMContextData = {
    om,
    mockFetchOM,
    setOm,
    createNewOM,
    createNewActivity,
    deleteActivity,
    pauseActivity,
  };

  return (
    <OMContext.Provider value={omContextData}>{children}</OMContext.Provider>
  );
}
