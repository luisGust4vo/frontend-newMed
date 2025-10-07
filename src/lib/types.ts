export type ID = string;

export interface Professional { 
  id: ID; 
  name: string; 
  email: string; 
}

export interface Patient { 
  id: ID; 
  name: string; 
  phone: string; 
  createdAt: string; 
}

export type ReportStatus = 'pending_payment' | 'ready';

export interface Report {
  id: ID;
  professionalId: ID;
  patientId: ID;
  title: string;
  body: string;
  price: number;
  requiresPayment: boolean;
  status: ReportStatus;
  createdAt: string;
  patient?: Patient;
}

export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Payment {
  id: ID;
  reportId: ID;
  providerId: string;
  status: PaymentStatus;
  amount: number;
  createdAt: string;
}

export interface LoginResponse { 
  token: string; 
  professional: Professional; 
}

export interface DashboardStats {
  totalReports: number;
  pendingPayments: number;
  totalRevenue: number;
  readyReports: number;
}