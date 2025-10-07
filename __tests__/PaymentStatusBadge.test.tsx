import { render, screen } from '@testing-library/react';
import { PaymentStatusBadge } from '@/components/PaymentStatusBadge';

describe('PaymentStatusBadge', () => {
  it('renders ready status correctly', () => {
    render(<PaymentStatusBadge status="ready" />);
    expect(screen.getByText('Pronto')).toBeInTheDocument();
  });

  it('renders pending payment status correctly', () => {
    render(<PaymentStatusBadge status="pending_payment" />);
    expect(screen.getByText('Aguardando pagamento')).toBeInTheDocument();
  });
});