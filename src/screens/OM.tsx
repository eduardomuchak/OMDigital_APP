import { CardContainer } from '../components/ui/CardContainer';
import { OMCard } from '../components/ui/OMCard';
import { OMMock } from '../components/ui/OMCard/OMMock';

export function OM() {
  return (
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
  );
}
