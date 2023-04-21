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
        <OMCard
          codigoBem={OMMock.codigoBem}
          ordemManutencao={OMMock.ordemManutencao}
          operacao={OMMock.operacao}
          paradaReal={OMMock.paradaReal}
          prevFim={OMMock.prevFim}
          onPress={() => console.log('clicou')}
          status="Aberta"
        />
        <OMCard
          codigoBem={OMMock.codigoBem}
          ordemManutencao={OMMock.ordemManutencao}
          operacao={OMMock.operacao}
          paradaReal={OMMock.paradaReal}
          prevFim={OMMock.prevFim}
          onPress={() => console.log('clicou')}
          status="Atrasada"
        />
        <OMCard
          codigoBem={OMMock.codigoBem}
          ordemManutencao={OMMock.ordemManutencao}
          operacao={OMMock.operacao}
          paradaReal={OMMock.paradaReal}
          prevFim={OMMock.prevFim}
          onPress={() => console.log('clicou')}
          status="Aguardando"
        />
        <OMCard
          codigoBem={OMMock.codigoBem}
          ordemManutencao={OMMock.ordemManutencao}
          operacao={OMMock.operacao}
          paradaReal={OMMock.paradaReal}
          prevFim={OMMock.prevFim}
          onPress={() => console.log('clicou')}
          status="Cancelada"
          isFinishOrCancel={true}
        />
        <OMCard
          codigoBem={OMMock.codigoBem}
          ordemManutencao={OMMock.ordemManutencao}
          operacao={OMMock.operacao}
          paradaReal={OMMock.paradaReal}
          prevFim={OMMock.prevFim}
          onPress={() => console.log('clicou')}
          status="Concluída"
          isFinishOrCancel={true}
        />
      </CardContainer>
      <AddNewActivityButton />
    </SafeAreaView>
  );
}
