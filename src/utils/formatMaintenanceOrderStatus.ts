export function formatStagesStatus(status: number) {
  switch (status) {
    case 1:
      return "Não iniciada";
    case 2:
      return "Iniciada";
    case 3:
      return "Pausada";
    case 4:
      return "Concluída";
  }
}

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
