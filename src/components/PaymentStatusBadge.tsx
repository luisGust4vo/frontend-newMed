import Badge from '@/components/ui/badge/Badge';
import { ReportStatus } from '@/lib/types';

interface PaymentStatusBadgeProps {
  status: ReportStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = {
    ready: { color: 'success' as const, text: 'Pronto' },
    pending_payment: { color: 'warning' as const, text: 'Aguardando pagamento' }
  };

  const { color, text } = config[status];

  return (
    <Badge color={color} variant="light" size="sm">
      {text}
    </Badge>
  );
}