import { Status } from '../services/GET/Status/status.interface';

export function handleStatusColor(status: Status) {
  const result = status.property.split('#')[1].toUpperCase();
  return `bg-[#${result}]`;
}

export function handleStageStatusColor(status: string) {
  switch (status) {
    case 'Não iniciada':
      return 'bg-status-red';
    case 'Iniciada':
      return 'bg-status-yellow';
    case 'Pausada':
      return 'bg-status-red';
    case 'Concluída':
      return 'bg-status-green';
    default:
      return 'bg-zinc-900';
  }
}
