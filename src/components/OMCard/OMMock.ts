import { OMMockProps } from '../../screens/VisaoOperador/components/FilterModal/interface';

export const OMMock: OMMockProps[] = [
  {
    id: 1,
    codigoBem: 'GKY-7G22',
    ordemManutencao: 'OM12345 - O S034561',
    operacao: 'Operação 1',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Aberta',
  },
  {
    id: 2,
    codigoBem: 'IKC-7G22',
    ordemManutencao: 'OM12345 - O S034562',
    operacao: 'Operação 1',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Aguardando',
  },
  {
    id: 3,
    codigoBem: 'ABC-7G22',
    ordemManutencao: 'OM12345 - O S034563',
    operacao: 'Operação 3',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Atrasada',
  },
  {
    id: 4,
    codigoBem: 'BAT-7G22',
    ordemManutencao: 'OM12345 - O S034564',
    operacao: 'Operação 2',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Concluída',
  },
  {
    id: 5,
    codigoBem: 'SUP-7G22',
    ordemManutencao: 'OM12345 - O S034565',
    operacao: 'Operação 2',
    paradaReal: '06/01/2023 - 08h00',
    prevFim: '07/01/2023 - 09h00',
    status: 'Cancelada',
  },
];
