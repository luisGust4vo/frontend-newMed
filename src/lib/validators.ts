import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const reportSchema = z.object({
  patientId: z.string().min(1, 'Selecione um paciente'),
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres').max(120, 'Título muito longo'),
  body: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
  price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
  requiresPayment: z.boolean(),
});

export const patientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(80, 'Nome muito longo'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Telefone inválido (formato: +5511999999999)'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ReportFormData = z.infer<typeof reportSchema>;
export type PatientFormData = z.infer<typeof patientSchema>;