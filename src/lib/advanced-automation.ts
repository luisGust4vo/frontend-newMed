export interface AutomationTrigger {
  id: string;
  name: string;
  description: string;
  icon: string;
  conditions: TriggerCondition[];
}

export interface TriggerCondition {
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'not_equals';
  value: string | number;
  label: string;
}

export interface AutomationAction {
  id: string;
  type: 'whatsapp' | 'email' | 'sms' | 'call' | 'discount' | 'appointment' | 'reminder' | 'survey';
  name: string;
  icon: string;
  template: string;
  delay: number;
  conditions?: string[];
  settings?: Record<string, any>;
}

export interface SmartWorkflow {
  id: string;
  name: string;
  description: string;
  category: 'retention' | 'acquisition' | 'revenue' | 'satisfaction' | 'efficiency';
  specialty: 'medical' | 'dental' | 'both';
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  aiOptimized: boolean;
  performance: {
    triggered: number;
    completed: number;
    revenue: number;
    satisfaction: number;
  };
  icon: string;
  color: string;
}

export const automationTriggers: AutomationTrigger[] = [
  {
    id: 'appointment_missed',
    name: 'Faltou na Consulta',
    description: 'Quando paciente não comparece',
    icon: '❌',
    conditions: [
      { field: 'appointment_status', operator: 'equals', value: 'missed', label: 'Status da consulta é "faltou"' },
      { field: 'hours_since_appointment', operator: 'greater_than', value: 1, label: 'Mais de 1 hora após horário' }
    ]
  },
  {
    id: 'payment_overdue',
    name: 'Pagamento Atrasado',
    description: 'Quando pagamento está em atraso',
    icon: '💳',
    conditions: [
      { field: 'days_overdue', operator: 'greater_than', value: 3, label: 'Mais de 3 dias em atraso' },
      { field: 'payment_status', operator: 'equals', value: 'overdue', label: 'Status é "atrasado"' }
    ]
  },
  {
    id: 'birthday_today',
    name: 'Aniversário Hoje',
    description: 'No dia do aniversário do paciente',
    icon: '🎂',
    conditions: [
      { field: 'birthday_date', operator: 'equals', value: 'today', label: 'Data de nascimento é hoje' }
    ]
  },
  {
    id: 'high_value_patient',
    name: 'Paciente VIP',
    description: 'Paciente com alto valor gasto',
    icon: '💎',
    conditions: [
      { field: 'total_spent', operator: 'greater_than', value: 5000, label: 'Gastou mais de R$ 5.000' },
      { field: 'visits_count', operator: 'greater_than', value: 10, label: 'Mais de 10 visitas' }
    ]
  },
  {
    id: 'treatment_completed',
    name: 'Tratamento Finalizado',
    description: 'Quando tratamento é concluído',
    icon: '✅',
    conditions: [
      { field: 'treatment_status', operator: 'equals', value: 'completed', label: 'Tratamento concluído' }
    ]
  }
];

export const automationActions: AutomationAction[] = [
  {
    id: 'whatsapp_personal',
    type: 'whatsapp',
    name: 'WhatsApp Personalizado',
    icon: '💬',
    template: 'Olá {nome}! {mensagem_personalizada}',
    delay: 0,
    settings: { personalization: true, emoji: true }
  },
  {
    id: 'discount_offer',
    type: 'discount',
    name: 'Oferta de Desconto',
    icon: '🎯',
    template: '{nome}, oferta especial: {desconto}% OFF até {data_limite}!',
    delay: 0,
    settings: { discount_percentage: 15, validity_days: 7 }
  },
  {
    id: 'satisfaction_survey',
    type: 'survey',
    name: 'Pesquisa de Satisfação',
    icon: '⭐',
    template: '{nome}, como foi sua experiência? Avalie de 1 a 5: {link_pesquisa}',
    delay: 1440, // 24h
    settings: { survey_type: 'nps', follow_up: true }
  },
  {
    id: 'appointment_reschedule',
    type: 'appointment',
    name: 'Reagendamento Automático',
    icon: '📅',
    template: '{nome}, que tal reagendarmos? Temos estes horários: {horarios_disponiveis}',
    delay: 30,
    settings: { suggest_times: 3, auto_book: false }
  },
  {
    id: 'vip_treatment',
    type: 'whatsapp',
    name: 'Tratamento VIP',
    icon: '👑',
    template: '{nome}, você é especial! Atendimento prioritário e benefícios exclusivos te aguardam!',
    delay: 0,
    settings: { priority_booking: true, exclusive_offers: true }
  }
];

export const smartWorkflows: SmartWorkflow[] = [
  {
    id: 'no_show_recovery_pro',
    name: 'Recuperação de Faltas Inteligente',
    description: 'Sistema avançado que recupera 85% dos pacientes que faltam',
    category: 'retention',
    specialty: 'both',
    trigger: automationTriggers[0],
    actions: [
      automationActions[0], // WhatsApp personalizado
      automationActions[1], // Desconto
      automationActions[3]  // Reagendamento
    ],
    isActive: true,
    priority: 'high',
    aiOptimized: true,
    performance: {
      triggered: 156,
      completed: 132,
      revenue: 23400,
      satisfaction: 4.2
    },
    icon: '🔄',
    color: 'orange'
  },
  {
    id: 'vip_experience',
    name: 'Experiência VIP Automática',
    description: 'Identifica e trata pacientes de alto valor automaticamente',
    category: 'revenue',
    specialty: 'both',
    trigger: automationTriggers[3],
    actions: [
      automationActions[4], // Tratamento VIP
      automationActions[1], // Oferta especial
      automationActions[2]  // Pesquisa satisfação
    ],
    isActive: true,
    priority: 'critical',
    aiOptimized: true,
    performance: {
      triggered: 45,
      completed: 43,
      revenue: 67800,
      satisfaction: 4.8
    },
    icon: '👑',
    color: 'purple'
  },
  {
    id: 'birthday_revenue_boost',
    name: 'Campanha Aniversário Inteligente',
    description: 'Aumenta receita em 40% com campanhas de aniversário personalizadas',
    category: 'acquisition',
    specialty: 'both',
    trigger: automationTriggers[2],
    actions: [
      automationActions[0], // WhatsApp personalizado
      automationActions[1]  // Desconto especial
    ],
    isActive: true,
    priority: 'medium',
    aiOptimized: true,
    performance: {
      triggered: 89,
      completed: 76,
      revenue: 15600,
      satisfaction: 4.6
    },
    icon: '🎉',
    color: 'pink'
  },
  {
    id: 'payment_recovery_gentle',
    name: 'Cobrança Educada e Eficaz',
    description: 'Recupera 78% dos pagamentos em atraso sem perder o paciente',
    category: 'revenue',
    specialty: 'both',
    trigger: automationTriggers[1],
    actions: [
      automationActions[0], // WhatsApp educado
      automationActions[1]  // Desconto para quitação
    ],
    isActive: true,
    priority: 'high',
    aiOptimized: true,
    performance: {
      triggered: 67,
      completed: 52,
      revenue: 34200,
      satisfaction: 3.9
    },
    icon: '💰',
    color: 'green'
  },
  {
    id: 'satisfaction_maximizer',
    name: 'Maximizador de Satisfação',
    description: 'Coleta feedback e melhora experiência automaticamente',
    category: 'satisfaction',
    specialty: 'both',
    trigger: automationTriggers[4],
    actions: [
      automationActions[2], // Pesquisa satisfação
      automationActions[0]  // Follow-up personalizado
    ],
    isActive: true,
    priority: 'medium',
    aiOptimized: true,
    performance: {
      triggered: 234,
      completed: 198,
      revenue: 8900,
      satisfaction: 4.7
    },
    icon: '🌟',
    color: 'blue'
  }
];

export const getWorkflowStats = () => {
  const totalTriggered = smartWorkflows.reduce((sum, w) => sum + w.performance.triggered, 0);
  const totalRevenue = smartWorkflows.reduce((sum, w) => sum + w.performance.revenue, 0);
  const avgSatisfaction = smartWorkflows.reduce((sum, w) => sum + w.performance.satisfaction, 0) / smartWorkflows.length;
  const activeWorkflows = smartWorkflows.filter(w => w.isActive).length;
  
  return {
    totalTriggered,
    totalRevenue,
    avgSatisfaction: Math.round(avgSatisfaction * 10) / 10,
    activeWorkflows,
    timeSaved: Math.round(totalTriggered * 0.25), // 15min por execução
    conversionRate: Math.round((smartWorkflows.reduce((sum, w) => sum + w.performance.completed, 0) / totalTriggered) * 100)
  };
};