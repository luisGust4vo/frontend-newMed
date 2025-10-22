'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  MessageCircle, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { Appointment, getCalendarDays, generateTimeSlots } from '@/lib/calendar';

interface CalendarViewProps {
  onCreateAppointment: (appointment: Partial<Appointment>) => void;
}

export function CalendarView({ onCreateAppointment }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const calendarDays = getCalendarDays(currentDate.getMonth(), currentDate.getFullYear());
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: string) => {
    const clickedDate = new Date(date);
    setSelectedDate(clickedDate);
  };

  const getStatusColor = (status: Appointment['status']) => {
    const colors = {
      scheduled: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[status];
  };

  const getStatusIcon = (status: Appointment['status']) => {
    const icons = {
      scheduled: <Clock className="w-3 h-3" />,
      confirmed: <CheckCircle className="w-3 h-3" />,
      completed: <CheckCircle className="w-3 h-3" />,
      cancelled: <AlertCircle className="w-3 h-3" />
    };
    return icons[status];
  };

  return (
    <div className="space-y-6">
      {/* Header do Calendário */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Agenda Inteligente
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gerencie consultas com WhatsApp automático
              </p>
            </div>
          </div>
          
          <Button
            variant="primary"
            startIcon={<Plus className="w-4 h-4" />}
            onClick={() => onCreateAppointment({})}
          >
            Nova Consulta
          </Button>
        </div>

        {/* Navegação do Mês */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Grid do Calendário */}
        <div className="grid grid-cols-7 gap-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
          
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day.date)}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                day.isToday
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : day.appointments.length > 0
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="text-sm font-medium">
                {new Date(day.date).getDate()}
              </div>
              {day.appointments.length > 0 && (
                <div className="flex justify-center mt-1">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Consultas do Dia */}
      {selectedDate && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                startIcon={<MessageCircle className="w-4 h-4" />}
              >
                Enviar Lembretes
              </Button>
              <Button
                variant="primary"
                size="sm"
                startIcon={<Plus className="w-4 h-4" />}
                onClick={() => onCreateAppointment({ startTime: selectedDate.toISOString() })}
              >
                Agendar
              </Button>
            </div>
          </div>

          {/* Horários */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generateTimeSlots(selectedDate).map((slot, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  slot.available
                    ? 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer hover:shadow-md'
                    : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                }`}
                onClick={() => slot.available && onCreateAppointment({ 
                  startTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 
                    parseInt(slot.time.split(':')[0]), parseInt(slot.time.split(':')[1])).toISOString()
                })}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {slot.time}
                  </span>
                  {slot.appointment && (
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(slot.appointment.status)}`}>
                      {getStatusIcon(slot.appointment.status)}
                      {slot.appointment.status}
                    </span>
                  )}
                </div>
                
                {slot.appointment ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{slot.appointment.patient?.name}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {slot.appointment.title}
                    </p>
                    <div className="flex items-center gap-2">
                      {!slot.appointment.whatsappSent && (
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          Enviar WhatsApp
                        </button>
                      )}
                      {!slot.appointment.reminderSent && (
                        <button className="text-xs text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
                          <Bell className="w-3 h-3" />
                          Lembrete
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Horário disponível
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}