import { encode } from 'base-64';
import { createContext, useEffect, useState } from 'react';
import { OM } from '../interfaces/om-context.interface';
import { OMMock } from '../mocks/om';

interface OMContextData {
  om: OM.MaintenanceOrderInfo[];
  mockFetchOM: () => Promise<OM.MaintenanceOrderInfo[]>;
  setOm: React.Dispatch<React.SetStateAction<OM.MaintenanceOrderInfo[]>>;
  createNewOM: (om: OM.MaintenanceOrderInfo) => void;
  createNewOMAPI: (om: OM.MaintenanceOrderInfoAPI) => void;
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

  function createNewOMAPI(newOM: OM.MaintenanceOrderInfoAPI) {
    const encodedCredentials = encode('mobile:+lXbfB3%QSF');
    fetch('https://hom-en-mnt-004.mvxsistemas.com.br/api', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + encodedCredentials,
      },
      body: JSON.stringify(newOM),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
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
        (activity) => activity.id === activityId,
      );
      newOm.atividades.splice(activityIndex, 1);
      return [...currentOm];
    });
  }

  function pauseOrInitiateActivity(
    activityId: number,
    omId: number,
    option: OM.Activity['status'],
  ) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      const activityIndex = newOm.atividades.findIndex(
        (activity) => activity.id === activityId,
      );
      newOm.atividades[activityIndex].status = option;
      return [...currentOm];
    });
  }

  function finishActivity(
    activityId: number,
    omId: number,
    finishDate: string,
  ) {
    setOm((currentOm) => {
      const omIndex = currentOm.findIndex((om) => om.id === omId);
      const newOm = currentOm[omIndex];
      const activityIndex = newOm.atividades.findIndex(
        (activity) => activity.id === activityId,
      );
      newOm.atividades[activityIndex].status = 'Concluída';
      newOm.atividades[activityIndex].dataFimReal = finishDate;
      return [...currentOm];
    });
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
    createNewOMAPI,
    createNewActivity,
    deleteActivity,
    pauseOrInitiateActivity,
    cancelOM,
    finishActivity,
    finishOM,
  };

  return (
    <OMContext.Provider value={omContextData}>{children}</OMContext.Provider>
  );
}
