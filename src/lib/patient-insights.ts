export interface PatientInsight {
  id: string;
  patientId: string;
  type: 'risk' | 'opportunity' | 'reminder' | 'trend';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  suggestedAction?: string;
  createdAt: string;
}

export interface PatientStats {
  totalVisits: number;
  lastVisit: string;
  nextAppointment?: string;
  totalSpent: number;
  averageInterval: number; // days between visits
  riskScore: number; // 0-100
  satisfactionScore: number; // 0-5
  treatmentCompliance: number; // 0-100%
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  title: string;
  description: string;
  estimatedCost: number;
  estimatedSessions: number;
  priority: 'low' | 'medium' | 'high';
  status: 'proposed' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  progress: number; // 0-100%
  nextStep: string;
  createdAt: string;
}

// Mock data para demo
export const generatePatientInsights = (patientId: string): PatientInsight[] => [
  {
    id: '1',
    patientId,
    type: 'risk',
    title: '⚠️ Risco de Abandono',
    description: 'Paciente não comparece há 6 meses. Histórico de faltas.',
    priority: 'high',
    actionable: true,
    suggestedAction: 'Enviar WhatsApp personalizado oferecendo desconto',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    patientId,
    type: 'opportunity',
    title: '💰 Oportunidade de Upsell',
    description: 'Perfil ideal para tratamento ortodôntico premium.',
    priority: 'medium',
    actionable: true,
    suggestedAction: 'Agendar consulta para apresentar plano ortodôntico',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    patientId,
    type: 'reminder',
    title: '📅 Limpeza Preventiva',
    description: 'Última limpeza há 8 meses. Recomendar agendamento.',
    priority: 'medium',
    actionable: true,
    suggestedAction: 'Enviar lembrete automático via WhatsApp',
    createdAt: new Date().toISOString()
  }
];

export const generatePatientStats = (): PatientStats => ({
  totalVisits: Math.floor(Math.random() * 20) + 5,
  lastVisit: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
  nextAppointment: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  totalSpent: Math.floor(Math.random() * 5000) + 500,
  averageInterval: Math.floor(Math.random() * 120) + 30,
  riskScore: Math.floor(Math.random() * 100),
  satisfactionScore: Math.random() * 2 + 3, // 3-5
  treatmentCompliance: Math.floor(Math.random() * 40) + 60 // 60-100%
});

export const generateTreatmentPlans = (patientId: string): TreatmentPlan[] => [
  {
    id: '1',
    patientId,
    title: 'Tratamento Ortodôntico Completo',
    description: 'Aparelho fixo metálico + contenção + acompanhamento',
    estimatedCost: 3500,
    estimatedSessions: 24,
    priority: 'high',
    status: 'proposed',
    progress: 0,
    nextStep: 'Aguardando aprovação do paciente',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    patientId,
    title: 'Clareamento Dental',
    description: 'Clareamento a laser + moldeiras para casa',
    estimatedCost: 800,
    estimatedSessions: 3,
    priority: 'medium',
    status: 'in_progress',
    progress: 66,
    nextStep: 'Sessão final de clareamento',
    createdAt: new Date().toISOString()
  }
];