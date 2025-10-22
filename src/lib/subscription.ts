export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: {
    reports: number;
    patients: number;
    aiAnalysis: number;
    whatsappMessages: number;
    storage: string;
  };
  popular?: boolean;
  color: string;
}

export interface Subscription {
  id: string;
  planId: string;
  userId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  usage: {
    reports: number;
    patients: number;
    aiAnalysis: number;
    whatsappMessages: number;
  };
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49.90,
    interval: 'monthly',
    color: 'blue',
    features: [
      'Até 50 laudos/mês',
      'Até 100 pacientes',
      'Templates básicos',
      'WhatsApp básico',
      'Suporte por email'
    ],
    limits: {
      reports: 50,
      patients: 100,
      aiAnalysis: 0,
      whatsappMessages: 200,
      storage: '1GB'
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99.90,
    interval: 'monthly',
    color: 'purple',
    popular: true,
    features: [
      'Laudos ilimitados',
      'Pacientes ilimitados',
      'IA para análise automática',
      'Calendário inteligente',
      'WhatsApp automático',
      'Analytics avançado',
      'Suporte prioritário'
    ],
    limits: {
      reports: -1, // ilimitado
      patients: -1,
      aiAnalysis: 100,
      whatsappMessages: 1000,
      storage: '10GB'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199.90,
    interval: 'monthly',
    color: 'gold',
    features: [
      'Tudo do Professional',
      'IA ilimitada',
      'Multi-usuários',
      'API personalizada',
      'Integração com laboratórios',
      'White-label',
      'Suporte 24/7'
    ],
    limits: {
      reports: -1,
      patients: -1,
      aiAnalysis: -1,
      whatsappMessages: -1,
      storage: '100GB'
    }
  }
];

export const getCurrentSubscription = (): Subscription => {
  return {
    id: '1',
    planId: 'professional',
    userId: '1',
    status: 'trial',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days trial
    usage: {
      reports: 12,
      patients: 25,
      aiAnalysis: 8,
      whatsappMessages: 45
    }
  };
};

export const getUsagePercentage = (used: number, limit: number): number => {
  if (limit === -1) return 0; // ilimitado
  return Math.min((used / limit) * 100, 100);
};