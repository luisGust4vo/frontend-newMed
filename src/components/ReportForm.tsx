'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { reportSchema, ReportFormData } from '@/lib/validators';
import { Patient } from '@/lib/types';
import { listPatients } from '@/lib/api';

interface ReportFormProps {
  onSubmit: (data: ReportFormData) => Promise<void>;
  loading?: boolean;
}

export function ReportForm({ onSubmit, loading = false }: ReportFormProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      requiresPayment: false,
      price: 0,
    },
  });

  const requiresPayment = watch('requiresPayment');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await listPatients();
        setPatients(data);
      } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Paciente *
        </label>
        <select
          {...register('patientId')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          disabled={loadingPatients}
        >
          <option value="">
            {loadingPatients ? 'Carregando...' : 'Selecione um paciente'}
          </option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name} - {patient.phone}
            </option>
          ))}
        </select>
        {errors.patientId && (
          <p className="text-red-500 text-sm mt-1">{errors.patientId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Título do Laudo *
        </label>
        <input
          type="text"
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Ex: Exame de Sangue - João Silva"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Conteúdo do Laudo *
        </label>
        <textarea
          {...register('body')}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Digite o conteúdo completo do laudo médico..."
        />
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('requiresPayment')}
          id="requiresPayment"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="requiresPayment" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Exigir pagamento antes da liberação
        </label>
      </div>

      {requiresPayment && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Valor (R$) *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('price', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          startIcon={<Plus className="w-4 h-4" />}
          className="flex-1"
        >
          {loading ? 'Criando...' : 'Criar Laudo'}
        </Button>
      </div>
    </form>
  );
}