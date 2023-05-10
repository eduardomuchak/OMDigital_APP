import { createContext, useEffect, useState } from "react";
import { OM } from "../interfaces/om-context.interface";
import { OMMock } from "../mocks/om";

interface OMContextData {
  om: OM.MaintenanceOrderInfo[];
  mockFetchOM: () => Promise<OM.MaintenanceOrderInfo[]>;
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
  };

  return (
    <OMContext.Provider value={omContextData}>{children}</OMContext.Provider>
  );
}
