export const SolicitationMock = [
  {
    id: 1,
    codigoBem: 'GKY-7G22',
    dataSolicitacao: '06/01/2023 - 09h53',
    status: 'Aguardando Análise',
    images: [
      'https://fastly.picsum.photos/id/599/1080/1080.jpg?hmac=gXWcNqkjB6fNFJR4_J2t_0Sij-2FEwFuDL5NPky44Sg',
    ],
  },
  {
    id: 2,
    codigoBem: 'AUY-1235',
    dataSolicitacao: '06/01/2023 - 09h53',
    dataAnalise: '06/01/2023 - 09h53',
    motivo: 'O conserto será feito na...',
    status: 'Manutenção Negada',
    images: [],
  },
  {
    id: 3,
    codigoBem: 'BGD-9182',
    dataSolicitacao: '06/01/2023 - 09h53',
    dataAnalise: '06/01/2023 - 09h53',
    status: 'Em Atendimento',
    images: [
      'https://fastly.picsum.photos/id/54/1080/1080.jpg?hmac=IORVOTScJvnlEq1qBpSnPtIFIV-vfyHz0y5CZSHpI78',
    ],
  },
  {
    id: 4,
    codigoBem: 'QNL-7667',
    dataSolicitacao: '06/01/2023 - 09h53',
    dataAnalise: '06/01/2023 - 09h53',
    dataAprovacao: '06/01/2023 - 09h53',
    status: 'Concluído',
    images: [],
  },
];

export const openedRequestsMock = [
  {
    id: 1,
    propertyCode: 'GKY-7G22',
    images: [
      'https://fastly.picsum.photos/id/599/1080/1080.jpg?hmac=gXWcNqkjB6fNFJR4_J2t_0Sij-2FEwFuDL5NPky44Sg',
    ],
    openedDate: '2023-05-03T17:42:20.202Z',
    requester: 'João da Silva',
    counter: '100205',
    sympton: 'Problema no ar condicionado, não está gelando',
  },
  {
    id: 2,
    propertyCode: 'JPL-5D43',
    images: [
      'https://fastly.picsum.photos/id/599/1080/1080.jpg?hmac=gXWcNqkjB6fNFJR4_J2t_0Sij-2FEwFuDL5NPky44Sg',
    ],
    openedDate: '2023-05-09T11:20:20.202Z',
    requester: 'Roberto Santos',
    counter: '64999',
    sympton:
      'Trocar óleo do motor. Está muito sujo e escuro, além de estar com cheiro de queimado',
  },
  {
    id: 3,
    propertyCode: 'AUT-9899',
    images: [
      'https://fastly.picsum.photos/id/599/1080/1080.jpg?hmac=gXWcNqkjB6fNFJR4_J2t_0Sij-2FEwFuDL5NPky44Sg',
    ],
    openedDate: '2023-03-16T13:13:20.202Z',
    requester: 'Juliana Silva',
    counter: '88652',
    sympton: 'Barulho estranho no motor, parece que está batendo',
  },
];
