'use client';


import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { CalendarView } from '@/components/CalendarView';
import { Appointment } from '@/lib/calendar';
import { useToast } from '@/hooks/useToast';

export default function CalendarPage() {
  const { success } = useToast();

  const handleCreateAppointment = (appointment: Partial<Appointment>) => {
    console.log('Criar consulta:', appointment);
    success('Funcionalidade em desenvolvimento - Consulta agendada!');
  };

  return (
    <ProtectedShell>
      <CalendarView onCreateAppointment={handleCreateAppointment} />
    </ProtectedShell>
  );
}