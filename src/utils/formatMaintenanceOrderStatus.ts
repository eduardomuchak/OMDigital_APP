// export function formatMaintenanceOrderStatus(status: number) {
//   switch (status) {
//     case 5:
//       return "Aberta";
//     case 4:
//       return "Aguardando";
//     case 7:
//       return "Concluída";
//     case 8:
//       return "Cancelada";
//   }
// }

export function formatMaintenanceOrderStatus(status: number) {
  switch (status) {
    case 1:
      return "Não aprovada";
    case 2:
      return "Recusada";
    case 3:
      return "Parada futura";
    case 4:
      return "Aguardando início";
    case 5:
      return "Em andamento";
    case 6:
      return "Atividade concluída";
    case 7:
      return "Finalizada";
    case 8:
      return "Cancelada";
  }
}
