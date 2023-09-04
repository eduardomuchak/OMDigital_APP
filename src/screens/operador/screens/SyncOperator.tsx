import NetInfo from '@react-native-community/netinfo';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'phosphor-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { SyncLoading } from '../../../components/SyncLoading';
import { useFilter } from '../../../contexts/OperadorFilter';
import { IOperadorFilter } from '../../../contexts/OperadorFilter/index.interface';
import { useOperador } from '../../../hooks/useOperador';
import { storage } from '../../../lib/mmkv/storage';
import { fetchOMFromAPI } from '../../../services/GET/OMs/fetchAllOms/fetchOM';
import { fetchOperationsFromAPI } from '../../../services/GET/Operations/fetchOperations';
import { fetchMainOrderStatus } from '../../../services/GET/Status/fetchMaintenanceOrdersStatus';
import { handleStatusColor } from '../../../utils/handleStatusColor';
import { maintenanceOrderMapper } from '../../../utils/maintenanceOrderMapper';

export function SyncOperator() {
  const [isSyncFinished, setIsSyncFinished] = useState(false);
  const { navigate } = useNavigation();
  const { operadorDataState, dispatchOperadorData } = useOperador();
  const { getFilterDataFromAsyncStorage, handleConfirmFilter } = useFilter();

  const fetchAllInfo = async () => {
    // Verificar a conexão com a internet
    const netInfoState = await NetInfo.fetch();
    const isConnected = netInfoState.isConnected;

    if (isConnected) {
      Promise.all([
        fetchOMFromAPI(),
        fetchMainOrderStatus(),
        fetchOperationsFromAPI(),
      ]).then((values) => {
        const [allOMs, statusOMs, allOperations] = values;

        if (allOMs.length) {
          const mappedOMs = maintenanceOrderMapper(allOMs);
          storage.set('allOMs', JSON.stringify(mappedOMs));
          dispatchOperadorData({ type: 'SET_ALL_OMS', payload: mappedOMs });
        }
        if (statusOMs.length) {
          const statusWithColor = statusOMs.map((item) => ({
            ...item,
            color: handleStatusColor(item),
          }));
          storage.set('statusOMs', JSON.stringify(statusWithColor));
          dispatchOperadorData({
            type: 'SET_OM_STATUS',
            payload: statusWithColor,
          });
        }
        if (allOperations.length) {
          storage.set('allOperations', JSON.stringify(allOperations));
          dispatchOperadorData({
            type: 'SET_ALL_OPERATIONS',
            payload: allOperations,
          });
        }

        // Verifica se existe um filtro salvo no armazenamento, se existir, recupera e aplica no estado
        const storedFilterConfig = storage.getString('operadorFilterConfig');
        if (storedFilterConfig !== undefined) {
          const filterData: IOperadorFilter.FilterConfig =
            JSON.parse(storedFilterConfig);
          dispatchOperadorData({
            type: 'SET_FILTER_CONFIG',
            payload: filterData,
          });
        } else {
          const mappedOMs = maintenanceOrderMapper(allOMs);
          dispatchOperadorData({
            type: 'SET_FILTERED_OMS',
            payload: mappedOMs,
          });
        }
      });
    } else {
      // Se não estiver conectado, use os dados do armazenamento
      const storedOMs = storage.getString('allOMs');
      const storedStatusOMs = storage.getString('statusOMs');
      const storedOperations = storage.getString('allOperations');
      const storedFilterConfig = storage.getString('operadorFilterData');

      if (storedFilterConfig) {
        dispatchOperadorData({
          type: 'SET_FILTER_CONFIG',
          payload: JSON.parse(storedFilterConfig),
        });
      }

      if (storedOMs && storedStatusOMs && storedOperations) {
        dispatchOperadorData({
          type: 'SET_ALL_OMS',
          payload: JSON.parse(storedOMs),
        });
        dispatchOperadorData({
          type: 'SET_OM_STATUS',
          payload: JSON.parse(storedStatusOMs),
        });
        dispatchOperadorData({
          type: 'SET_ALL_OPERATIONS',
          payload: JSON.parse(storedOperations),
        });
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFilterDataFromAsyncStorage();
      fetchAllInfo();
    }, []),
  );

  useEffect(() => {
    if (
      operadorDataState.allMaintenanceOrders.length &&
      operadorDataState.statusOMs.length &&
      operadorDataState.allOperations.length
    ) {
      setIsSyncFinished(true);
    }
  }, [operadorDataState]);

  useEffect(() => {}, [operadorDataState.filterConfig]);

  if (isSyncFinished) {
    setTimeout(() => {
      navigate('HomeOperador');
    }, 2000);
    return (
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutDown}
        className="flex h-screen flex-1 flex-col items-center justify-center gap-5 px-5"
      >
        <CheckCircle color="#046700" weight="bold" size={64} />
        <Text className="font-poppinsBold text-xl text-zinc-900">
          Informações sincronizadas com sucesso!
        </Text>
      </Animated.View>
    );
  }

  return <SyncLoading />;
}

export default SyncOperator;
