export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  type: 'consultation' | 'exam' | 'procedure' | 'followup';
  whatsappSent: boolean;
  reminderSent: boolean;
  patient?: {
    id: string;
    name: string;
    phone: string;
  };
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointment?: Appointment;
}

export interface CalendarDay {
  date: string;
  dayOfWeek: string;
  isToday: boolean;
  appointments: Appointment[];
  availableSlots: number;
}

// Mock data para demo
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    professionalId: '1',
    title: 'Consulta - João Silva',
    description: 'Consulta de rotina',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2h from now
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    type: 'consultation',
    whatsappSent: true,
    reminderSent: false,
    patient: { id: '1', name: 'João Silva', phone: '+5511999999999' }
  },
  {
    id: '2',
    patientId: '2',
    professionalId: '1',
    title: 'Exame - Maria Santos',
    description: 'Raio-X dentário',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    endTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
    type: 'exam',
    whatsappSent: false,
    reminderSent: false,
    patient: { id: '2', name: 'Maria Santos', phone: '+5511888888888' }
  }
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8;
  const endHour = 18;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const appointment = mockAppointments.find(apt => {
        const aptDate = new Date(apt.startTime);
        return aptDate.toDateString() === date.toDateString() && 
               aptDate.getHours() === hour && 
               aptDate.getMinutes() === minute;
      });
      
      slots.push({
        time,
        available: !appointment,
        appointment
      });
    }
  }
  
  return slots;
};

export const getCalendarDays = (month: number, year: number): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayAppointments = mockAppointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      return aptDate.toDateString() === date.toDateString();
    });
    
    days.push({
      date: date.toISOString(),
      dayOfWeek: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      isToday: date.toDateString() === today.toDateString(),
      appointments: dayAppointments,
      availableSlots: generateTimeSlots(date).filter(slot => slot.available).length
    });
  }
  
  return days;
};