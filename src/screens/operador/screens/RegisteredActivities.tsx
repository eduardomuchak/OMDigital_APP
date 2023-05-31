import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { View } from 'react-native';

import { Header } from '../../../components/Header';

import { OMContext } from '../../../contexts/om-context';
import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';
import { SwipeableActivityCardList } from '../components/SwipeableActivityCardList';

export function RegisteredActivities() {
  const { om } = useContext(OMContext);
  const route = useRoute();
  const { id } = route.params as { id?: number };

  const filteredOM = om.filter((om) => om.id === id);
  const activities = filteredOM[0]?.atividades;

  const operationInfoProps = {
    codigoBem: filteredOM[0]?.codigoBem,
    ordemManutencao: filteredOM[0]?.ordemManutencao,
    operacao: filteredOM[0]?.operacao,
    paradaReal: filteredOM[0]?.paradaReal,
    prevFim: filteredOM[0]?.prevFim,
    latitude: filteredOM[0]?.latitude,
    longitude: filteredOM[0]?.longitude,
  };

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title={'Atividades Lançadas'} />
      <OperationInfoCard operationInfo={operationInfoProps} />
      <SwipeableActivityCardList activities={activities} />
    </View>
  );
}
