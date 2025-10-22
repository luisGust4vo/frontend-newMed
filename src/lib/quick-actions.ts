export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: 'communication' | 'scheduling' | 'billing' | 'clinical';
  specialty: 'medical' | 'dental' | 'both';
  action: () => void;
  shortcut?: string;
  premium?: boolean;
}

export const quickActions: QuickAction[] = [
  {
    id: 'bulk_whatsapp',
    title: 'WhatsApp em Massa',
    description: 'Envie mensagens para múltiplos pacientes simultaneamente',
    icon: '📱',
    color: 'green',
    category: 'communication',
    specialty: 'both',
    action: () => console.log('Bulk WhatsApp'),
    shortcut: 'Ctrl+W',
    premium: true
  },
  {
    id: 'appointment_reminder',
    title: 'Lembretes Automáticos',
    description: 'Configure lembretes para consultas de amanhã',
    icon: '⏰',
    color: 'blue',
    category: 'scheduling',
    specialty: 'both',
    action: () => console.log('Appointment reminders'),
    shortcut: 'Ctrl+R'
  },
  {
    id: 'payment_follow_up',
    title: 'Cobrança Inteligente',
    description: 'Envie cobranças educadas para pagamentos em atraso',
    icon: '💳',
    color: 'orange',
    category: 'billing',
    specialty: 'both',
    action: () => console.log('Payment follow-up'),
    premium: true
  },
  {
    id: 'birthday_campaign',
    title: 'Campanha Aniversário',
    description: 'Parabenize pacientes e ofereça descontos especiais',
    icon: '🎂',
    color: 'pink',
    category: 'communication',
    specialty: 'both',
    action: () => console.log('Birthday campaign')
  },
  {
    id: 'cleaning_reminder',
    title: 'Lembrete Limpeza',
    description: 'Notifique pacientes sobre limpeza preventiva',
    icon: '🦷',
    color: 'teal',
    category: 'clinical',
    specialty: 'dental',
    action: () => console.log('Cleaning reminder')
  },
  {
    id: 'exam_results',
    title: 'Resultados Prontos',
    description: 'Notifique quando exames estiverem disponíveis',
    icon: '📋',
    color: 'purple',
    category: 'clinical',
    specialty: 'medical',
    action: () => console.log('Exam results')
  },
  {
    id: 'no_show_recovery',
    title: 'Recuperar Faltas',
    description: 'Reagende automaticamente pacientes que faltaram',
    icon: '🔄',
    color: 'red',
    category: 'scheduling',
    specialty: 'both',
    action: () => console.log('No-show recovery'),
    premium: true
  },
  {
    id: 'satisfaction_survey',
    title: 'Pesquisa Satisfação',
    description: 'Colete feedback dos pacientes automaticamente',
    icon: '⭐',
    color: 'yellow',
    category: 'communication',
    specialty: 'both',
    action: () => console.log('Satisfaction survey')
  }
];

export const getActionsByCategory = (category: string) => 
  quickActions.filter(action => action.category === category);

export const getActionsBySpecialty = (specialty: 'medical' | 'dental' | 'both') => 
  quickActions.filter(action => action.specialty === specialty || action.specialty === 'both');