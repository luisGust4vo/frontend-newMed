export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: 'appointment_missed' | 'treatment_due' | 'birthday' | 'payment_overdue' | 'new_patient';
  actions: WorkflowAction[];
  isActive: boolean;
  specialty: 'medical' | 'dental' | 'both';
  icon: string;
  color: string;
  timesTriggered: number;
  successRate: number;
}

export interface WorkflowAction {
  type: 'whatsapp' | 'email' | 'sms' | 'call_reminder' | 'discount_offer';
  delay: number; // minutes
  template: string;
  conditions?: string[];
}

export const automationWorkflows: AutomationWorkflow[] = [
  {
    id: 'missed_appointment',
    name: 'Faltou na Consulta',
    description: 'Reagenda automaticamente quando paciente falta',
    trigger: 'appointment_missed',
    specialty: 'both',
    icon: '📅',
    color: 'orange',
    isActive: true,
    timesTriggered: 45,
    successRate: 78,
    actions: [
      {
        type: 'whatsapp',
        delay: 30,
        template: 'Olá {nome}! Notamos que você não pôde comparecer hoje. Que tal reagendarmos? Temos horários disponíveis amanhã! 😊'
      },
      {
        type: 'discount_offer',
        delay: 1440, // 24h
        template: 'Oferta especial para você {nome}! 15% de desconto na próxima consulta se agendar até sexta-feira! 🎉',
        conditions: ['no_response_24h']
      }
    ]
  },
  {
    id: 'cleaning_reminder',
    name: 'Lembrete de Limpeza',
    description: 'Lembra pacientes sobre limpeza preventiva',
    trigger: 'treatment_due',
    specialty: 'dental',
    icon: '🦷',
    color: 'blue',
    isActive: true,
    timesTriggered: 120,
    successRate: 65,
    actions: [
      {
        type: 'whatsapp',
        delay: 0,
        template: 'Oi {nome}! Está na hora da sua limpeza preventiva! 🦷✨ Que tal agendar? Sua saúde bucal agradece!'
      },
      {
        type: 'discount_offer',
        delay: 10080, // 7 days
        template: 'Última chance {nome}! Limpeza com 20% OFF só até domingo! Não perca! 🎯'
      }
    ]
  },
  {
    id: 'birthday_campaign',
    name: 'Aniversário VIP',
    description: 'Parabeniza e oferece desconto no aniversário',
    trigger: 'birthday',
    specialty: 'both',
    icon: '🎂',
    color: 'pink',
    isActive: true,
    timesTriggered: 28,
    successRate: 85,
    actions: [
      {
        type: 'whatsapp',
        delay: 0,
        template: '🎉 Parabéns {nome}! Hoje é seu dia especial! Como presente, você ganhou 25% OFF em qualquer tratamento! 🎁'
      }
    ]
  },
  {
    id: 'exam_results',
    name: 'Resultados Prontos',
    description: 'Notifica quando exames ficam prontos',
    trigger: 'new_patient',
    specialty: 'medical',
    icon: '📋',
    color: 'green',
    isActive: true,
    timesTriggered: 67,
    successRate: 92,
    actions: [
      {
        type: 'whatsapp',
        delay: 0,
        template: 'Oi {nome}! Seus exames estão prontos! 📋 Pode baixar pelo link ou agendar consulta para conversar sobre os resultados.'
      }
    ]
  },
  {
    id: 'payment_reminder',
    name: 'Cobrança Inteligente',
    description: 'Lembra pagamentos em atraso de forma educada',
    trigger: 'payment_overdue',
    specialty: 'both',
    icon: '💳',
    color: 'red',
    isActive: true,
    timesTriggered: 23,
    successRate: 71,
    actions: [
      {
        type: 'whatsapp',
        delay: 0,
        template: 'Oi {nome}! Só um lembrete amigável sobre o pagamento do seu tratamento. Qualquer dúvida, estou aqui! 😊'
      },
      {
        type: 'call_reminder',
        delay: 2880, // 48h
        template: 'Ligar para {nome} sobre pagamento pendente',
        conditions: ['no_payment_48h']
      }
    ]
  }
];

export const getWorkflowStats = () => ({
  totalActive: automationWorkflows.filter(w => w.isActive).length,
  totalTriggered: automationWorkflows.reduce((sum, w) => sum + w.timesTriggered, 0),
  averageSuccessRate: Math.round(automationWorkflows.reduce((sum, w) => sum + w.successRate, 0) / automationWorkflows.length),
  timeSaved: 156 // hours per month
});