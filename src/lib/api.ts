import { LoginResponse, Report, Patient, ID, DashboardStats } from './types';

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL!;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${base}${path}`, { ...init, headers });
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) throw new Error(await res.text());
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : (await res.blob() as unknown as T);
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // Mock login for demo - aceita qualquer email/senha
  if (email && password) {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      token: 'demo-token-' + Date.now(),
      professional: {
        id: '1',
        name: 'Dr. João Silva',
        email: email,
      }
    };
  }
  
  throw new Error('Email e senha são obrigatórios');
};

// Mock data para demo
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '+5511999999999',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Maria Santos',
    phone: '+5511888888888',
    createdAt: new Date().toISOString(),
  }
];

const mockReports: Report[] = [
  {
    id: '1',
    professionalId: '1',
    patientId: '1',
    title: 'Exame de Sangue - João Silva',
    body: 'Resultado do exame de sangue completo...',
    price: 150.00,
    requiresPayment: true,
    status: 'pending_payment',
    createdAt: new Date().toISOString(),
    patient: mockPatients[0]
  },
  {
    id: '2',
    professionalId: '1',
    patientId: '2',
    title: 'Raio-X Tórax - Maria Santos',
    body: 'Resultado do raio-x do tórax...',
    price: 0,
    requiresPayment: false,
    status: 'ready',
    createdAt: new Date().toISOString(),
    patient: mockPatients[1]
  }
];

export const getMyReports = async (): Promise<Report[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockReports;
};

export const createReport = async (payload: Record<string, unknown>): Promise<{ report: Report; checkoutUrl?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const patient = mockPatients.find(p => p.id === payload.patientId);
  const newReport: Report = {
    id: Date.now().toString(),
    professionalId: '1',
    patientId: payload.patientId as string,
    title: payload.title as string,
    body: payload.body as string,
    price: payload.price as number,
    requiresPayment: payload.requiresPayment as boolean,
    status: payload.requiresPayment ? 'pending_payment' : 'ready',
    createdAt: new Date().toISOString(),
    patient
  };
  
  mockReports.push(newReport);
  
  return {
    report: newReport,
    checkoutUrl: payload.requiresPayment ? 'https://checkout.demo.com/pay' : undefined
  };
};

export const sendPayment = async (reportId: ID, phone: string): Promise<{ ok: true }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Enviando cobrança do laudo ${reportId} para ${phone}`);
  return { ok: true };
};

export const listPatients = async (): Promise<Patient[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPatients;
};

export const createPatient = async (p: Record<string, unknown>): Promise<Patient> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newPatient: Patient = {
    id: Date.now().toString(),
    name: p.name as string,
    phone: p.phone as string,
    createdAt: new Date().toISOString(),
  };
  
  mockPatients.push(newPatient);
  return newPatient;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    totalReports: mockReports.length,
    pendingPayments: mockReports.filter(r => r.status === 'pending_payment').length,
    totalRevenue: mockReports.reduce((sum, r) => sum + (r.requiresPayment ? r.price : 0), 0),
    readyReports: mockReports.filter(r => r.status === 'ready').length,
  };
};

export const downloadReport = (id: ID) => {
  // Mock download para demo
  const report = mockReports.find(r => r.id === id);
  if (report) {
    // Simula download criando um blob com o conteúdo do laudo
    const content = `LAUDO MÉDICO\n\nTítulo: ${report.title}\n\nConteúdo:\n${report.body}\n\nData: ${new Date(report.createdAt).toLocaleDateString('pt-BR')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laudo-${report.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
};