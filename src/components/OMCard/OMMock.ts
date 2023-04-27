import { OMMockProps } from '../../screens/VisaoOperador/components/FilterModal/interface';

export const OMMock: OMMockProps[] = [
  {
    id: 1,
    codigoBem: 'GKY-7G22',
    ordemManutencao: 'OM12345 - O S034567',
    operacao: 'Operação 1',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Aberta',
  },
  {
    id: 2,
    codigoBem: 'GKY-7G22',
    ordemManutencao: 'OM12345 - O S034567',
    operacao: 'Operação 1',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Aguardando',
  },
  {
    id: 3,
    codigoBem: 'GKY-7G22',
    ordemManutencao: 'OM12345 - O S034567',
    operacao: 'Operação 3',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Atrasada',
  },
  {
    id: 4,
    codigoBem: 'GKY-7G22',
    ordemManutencao: 'OM12345 - O S034567',
    operacao: 'Operação 2',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Concluída',
  },
  {
    id: 5,
    codigoBem: 'GKY-7G22',
    ordemManutencao: 'OM12345 - O S034567',
    operacao: 'Operação 2',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Cancelada',
  },
];
