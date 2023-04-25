import { SafeAreaView } from 'react-native';
import { CardContainer } from '../../components/CardContainer';
import { SolicitationMock } from '../../components/SolicitationCard/SolicitationMock';
import { Header } from '../../components/Header';
import { StatusLegend } from '../../components/StatusLegend';
import { SolicitationCard } from '../../components/SolicitationCard';
import { CustomButton } from '../../components/ui/CustomButton';
import { StatusFilter } from '../../components/StatusFilter';

export function HomeSolicitante() {
  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <Header isHomeScreen title={'Olá, João Motorista'} />
      <StatusFilter />
      <StatusLegend />
      <CardContainer>
        {SolicitationMock.map((item) => (
          <SolicitationCard key={item.id} {...item} />
        ))}
        <CustomButton variant="primary">Relatar Problema</CustomButton>
      </CardContainer>
    </SafeAreaView>
  );
}
