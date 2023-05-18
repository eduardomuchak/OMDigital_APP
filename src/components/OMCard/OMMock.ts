import { OMMockProps } from "../../screens/operador/components/FilterModal/interface";

export const OMMock: OMMockProps[] = [
  {
    id: 1,
    codigoBem: "GKY-7G22",
    ordemManutencao: "OM12345 - O S034561",
    operacao: "Operação 1",
    paradaReal: "2023-05-03T17:42:20.202Z",
    prevFim: "2023-05-08T17:42:20.202Z",
    status: "Aberta",
  },
  {
    id: 2,
    codigoBem: "IKC-7G22",
    ordemManutencao: "OM12345 - O S034562",
    operacao: "Operação 1",
    paradaReal: "2023-05-03T17:42:20.202Z",
    prevFim: "2023-05-08T17:42:20.202Z",
    status: "Aguardando",
  },
  {
    id: 3,
    codigoBem: "ABC-7G22",
    ordemManutencao: "OM12345 - O S034563",
    operacao: "Operação 3",
    paradaReal: "2023-05-03T17:42:20.202Z",
    prevFim: "2023-05-08T17:42:20.202Z",
    status: "Atrasada",
  },
  {
    id: 4,
    codigoBem: "BAT-7G22",
    ordemManutencao: "OM12345 - O S034564",
    operacao: "Operação 2",
    paradaReal: "2023-05-03T17:42:20.202Z",
    prevFim: "2023-05-08T17:42:20.202Z",
    status: "Concluída",
  },
  {
    id: 5,
    codigoBem: "SUP-7G22",
    ordemManutencao: "OM12345 - O S034565",
    operacao: "Operação 2",
    paradaReal: "2023-05-03T17:42:20.202Z",
    prevFim: "2023-05-08T17:42:20.202Z",
    status: "Cancelada",
  },
];
