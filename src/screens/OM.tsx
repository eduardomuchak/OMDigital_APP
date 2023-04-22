import { SafeAreaView } from 'react-native';
import { CardContainer } from '../components/ui/CardContainer';
import { OMCard } from '../components/ui/OMCard';
import { OMMock } from '../components/ui/OMCard/OMMock';
import { Header } from '../components/Header';
import { AddNewActivityButton } from '../components/AddNewActivityButton';

export function OM() {
  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header isHomeScreen title={'Olá, Alan José'} />
      <CardContainer>
        {OMMock.map((item) => (
          <OMCard
            isFinishOrCancel={
              item.status === 'Cancelada' || item.status === 'Concluída' ? true : false
            }
            key={item.id}
            {...item}
          />
        ))}
      </CardContainer>
      <AddNewActivityButton />
    </SafeAreaView>
  );
}
