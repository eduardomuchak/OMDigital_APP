export function handleStatusColor(status: string) {
  switch (status) {
    case "Não aprovada":
      return "bg-status-red";
    case "Recusada":
      return "bg-red-500";
    case "Parada futura":
      return "bg-cyan-500";
    case "Aguardando início":
      return "bg-status-yellow";
    case "Em andamento":
      return "bg-emerald-500";
    case "Atividade concluída":
      return "bg-blue-500";
    case "Finalizada":
      return "Finalizada";
    case "Cancelada":
      return "Cancelada";
    default:
      return "bg-zinc-900";
  }
}


export function handleStageStatusColor(status: string) {
  switch (status) {
    case "Não iniciada":
      return "bg-status-red";
    case "Iniciada":
      return "bg-status-yellow";
    case "Pausada":
      return "bg-status-red";
    case "Concluída":
      return "bg-status-green";
    default:
      return "bg-zinc-900";
  }
}
