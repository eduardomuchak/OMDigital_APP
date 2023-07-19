export function formatMaintenanceOrderStatus(status: number) {
  switch (status) {
    case 5:
      return "Aberta";
    case 4:
      return "Aguardando";
    case 7:
      return "Concluída";
    case 8:
      return "Cancelada";
  }
}