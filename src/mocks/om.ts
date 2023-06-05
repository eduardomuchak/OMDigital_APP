import { OM } from '../interfaces/om-context.interface';

export const OMMock: OM.MaintenanceOrderInfo[] = [
  {
    id: 1,
    codigoBem: 'GKY-7G22',
    ordemManutencao: 'OM12345 - O S034561',
    operacao: 'Operação 1',
    paradaReal: '2023-05-03T17:42:20.202Z',
    prevFim: '2023-05-03T17:42:20.202Z',
    status: 'Aberta',
    latitude: '-23.5505199',
    longitude: '-46.6333094',
    localDeManutencao: 'Matriz Lavras',
    controlador: 'Marcos',
    telefone: '(99) 9 9191-9191',
    atividades: [
      {
        id: 1,
        descricao: 'Troca de óleo',
        status: 'Concluída',
        dataFimReal: '2023-05-04T11:29:20.202Z',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [
          'https://fastly.picsum.photos/id/599/1080/1080.jpg?hmac=gXWcNqkjB6fNFJR4_J2t_0Sij-2FEwFuDL5NPky44Sg',
        ],
      },
      {
        id: 2,
        descricao: 'Troca da lona de freio',
        status: 'Concluída',
        dataFimReal: '2023-05-03T14:42:20.202Z',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [
          'https://fastly.picsum.photos/id/54/1080/1080.jpg?hmac=IORVOTScJvnlEq1qBpSnPtIFIV-vfyHz0y5CZSHpI78',
        ],
      },
      {
        id: 3,
        descricao: 'Verificar o óleo da caixa de marcha',
        status: 'Concluída',
        dataFimReal: '2023-05-03T14:42:20.202Z',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 4,
        descricao: 'Verificar o óleo da caixa de marcha',
        status: 'Concluída',
        dataFimReal: '2023-05-03T14:42:20.202Z',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
    ],
    sintomas: [
      {
        id: 1,
        descricao:
          'Lorem ipsum dolor1 sit amet, consectetur adipiscing elit. Morbi sit amet interdum velit, vel convallis enim.',
      },
      {
        id: 2,
        descricao: 'Lore ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 3,
        descricao: 'Lore ipsum dolor sit amet, consectetur',
      },
    ],
  },
  {
    id: 2,
    codigoBem: 'IKC-7G22',
    ordemManutencao: 'OM12345 - O S034562',
    operacao: 'Operação 1',
    paradaReal: '2023-05-03T17:42:20.202Z',
    prevFim: '2023-05-03T17:42:20.202Z',
    status: 'Aguardando',
    latitude: '-23.5505199',
    longitude: '-46.6333094',
    localDeManutencao: 'Matriz Lavras',
    controlador: 'Marcos',
    telefone: '(99) 9 9191-9191',
    atividades: [
      {
        id: 1,
        descricao: 'Troca de óleo',
        status: 'Concluída',
        dataFimReal: '2023-05-03T14:42:20.202Z',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 2,
        descricao: 'Troca da lona de freio',
        status: 'Atrasada',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 3,
        descricao: 'Verificar o óleo da caixa de marcha',
        status: 'Em andamento',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
    ],
    sintomas: [
      {
        id: 1,
        descricao: 'Fumaça branca',
      },
    ],
  },
  {
    id: 3,
    codigoBem: 'ABC-7G22',
    ordemManutencao: 'OM12345 - O S034563',
    operacao: 'Operação 3',
    paradaReal: '2023-05-03T17:42:20.202Z',
    prevFim: '2023-05-03T17:42:20.202Z',
    status: 'Atrasada',
    latitude: '-23.5505199',
    longitude: '-46.6333094',
    localDeManutencao: 'Matriz Lavras',
    controlador: 'Marcos',
    telefone: '(99) 9 9191-9191',
    atividades: [
      {
        id: 1,
        descricao: 'Troca de óleo',
        status: 'Concluída',
        dataFimReal: '2023-05-03T14:42:20.202Z',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 2,
        descricao: 'Troca da lona de freio',
        status: 'Atrasada',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 3,
        descricao: 'Verificar o óleo da caixa de marcha',
        status: 'Em andamento',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
    ],
    sintomas: [
      {
        id: 1,
        descricao: 'Fumaça verde',
      },
    ],
  },
  {
    id: 4,
    codigoBem: 'BAT-7G22',
    ordemManutencao: 'OM12345 - O S034564',
    operacao: 'Operação 2',
    paradaReal: '2023-05-03T17:42:20.202Z',
    prevFim: '2023-05-03T17:42:20.202Z',
    status: 'Concluída',
    latitude: '-23.5505199',
    longitude: '-46.6333094',
    localDeManutencao: 'Matriz Lavras',
    controlador: 'Marcos',
    telefone: '(99) 9 9191-9191',
    atividades: [
      {
        id: 1,
        descricao: 'Troca de óleo',
        status: 'Concluída',
        dataFimReal: '2023-05-03T14:42:20.202Z',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 2,
        descricao: 'Troca da lona de freio',
        status: 'Atrasada',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 3,
        descricao: 'Verificar o óleo da caixa de marcha',
        status: 'Em andamento',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
    ],
    sintomas: [],
  },
  {
    id: 5,
    codigoBem: 'SUP-7G22',
    ordemManutencao: 'OM12345 - O S034565',
    operacao: 'Operação 2',
    paradaReal: '2023-05-03T17:42:20.202Z',
    prevFim: '2023-05-03T17:42:20.202Z',
    status: 'Cancelada',
    latitude: '-23.5505199',
    longitude: '-46.6333094',
    localDeManutencao: 'Matriz Lavras',
    controlador: 'Marcos',
    telefone: '(99) 9 9191-9191',
    atividades: [
      {
        id: 1,
        descricao: 'Troca de óleo',
        status: 'Concluída',
        dataFimReal: '2023-05-03T14:42:20.202Z',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 2,
        descricao: 'Troca da lona de freio',
        status: 'Atrasada',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
      {
        id: 3,
        descricao: 'Verificar o óleo da caixa de marcha',
        status: 'Em andamento',
        dataInicioPrevista: '2023-05-03T17:42:20.202Z',
        dataFimPrevista: '2023-05-03T17:42:20.202Z',
        images: [],
      },
    ],
    sintomas: [],
  },
];