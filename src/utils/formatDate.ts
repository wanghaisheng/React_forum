
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatTimeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: false, locale: ptBR });
}

export function formatDate(date: string | Date): string {
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('pt-BR').format(dateObject);
}
