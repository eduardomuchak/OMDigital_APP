import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { createContext, useContext } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import { NewMaintenanceOrder } from '../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';

interface QueueContextType {
  maintenanceOrdersQueue: NewMaintenanceOrder.Payload[];
  addOMToQueue(om: NewMaintenanceOrder.Payload): void;
  removeOMFromQueue(omIndex: number): void;
  clearOMQueue(): void;
  sendQueuedMaintenanceOrders(
    mutation: UseMutationResult<
      AxiosResponse<any, any>,
      unknown,
      NewMaintenanceOrder.Payload,
      unknown
    >,
  ): void;
}

const mock = [
  {
    asset_code: 'BUD7615',
    counter: 123123,
    latitude: 37.421998333333335,
    longitude: -122.084,
    service_type: 'C',
    status: 4,
    start_prev_date: '2023-10-24',
    start_prev_hr: '12:26:19.509Z',
    end_prev_date: '2023-10-27',
    end_prev_hr: '12:26:19.509Z',
    obs: '',
    resp_id: 5,
    symptoms: [
      {
        id: null,
        description: '',
      },
    ],
  },
];

const QueueContext = createContext<QueueContextType>({
  maintenanceOrdersQueue: [],
  addOMToQueue: () => {},
  removeOMFromQueue: () => {},
  clearOMQueue: () => {},
  sendQueuedMaintenanceOrders: () => {},
});

const QueueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [maintenanceOrdersQueue, setMaintenanceOrdersQueue] = useMMKVObject<
    NewMaintenanceOrder.Payload[]
  >('queuedCreateNewMaintenanceOrder');
  if (!maintenanceOrdersQueue) return null;

  console.log('QUEUE PROVIDER => ', maintenanceOrdersQueue);

  const addOMToQueue = (om: NewMaintenanceOrder.Payload) => {
    const newQueue = [...maintenanceOrdersQueue, om];
    setMaintenanceOrdersQueue(newQueue);
  };

  const removeOMFromQueue = (omIndex: number) => {
    if (!maintenanceOrdersQueue) return;

    const newQueue = maintenanceOrdersQueue.filter((_, index) => {
      return index !== omIndex;
    });

    setMaintenanceOrdersQueue(newQueue);
  };

  const clearOMQueue = () => {
    setMaintenanceOrdersQueue([]);
  };

  const sendQueuedMaintenanceOrders = (
    mutation: UseMutationResult<
      AxiosResponse<any, any>,
      unknown,
      NewMaintenanceOrder.Payload,
      unknown
    >,
  ) => {
    if (maintenanceOrdersQueue) {
      maintenanceOrdersQueue.forEach((om) => {
        mutation.mutate(om);
      });
      clearOMQueue();
    }
  };

  return (
    <QueueContext.Provider
      value={{
        maintenanceOrdersQueue,
        addOMToQueue,
        removeOMFromQueue,
        clearOMQueue,
        sendQueuedMaintenanceOrders,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

function useQueue() {
  const context = useContext(QueueContext);

  if (!context) {
    throw new Error('useQueue must be used within an QueueProvider.');
  }

  return context;
}

export { QueueProvider, useQueue };
