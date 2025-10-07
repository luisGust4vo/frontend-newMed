'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { ReportTemplate, TemplateField } from '@/lib/templates';
import { Patient } from '@/lib/types';

interface TemplateFormProps {
  template: ReportTemplate;
  patients: Patient[];
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onBack: () => void;
  loading?: boolean;
}

export function TemplateForm({ template, patients, onSubmit, onBack, loading = false }: TemplateFormProps) {
  // Criar schema dinâmico baseado nos campos do template
  const createSchema = (fields: TemplateField[]) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {
      patientId: z.string().min(1, 'Selecione um paciente'),
      requiresPayment: z.boolean(),
      price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
    };

    fields.forEach(field => {
      if (field.type === 'number') {
        schemaFields[field.id] = field.required 
          ? z.number()
          : z.number().optional();
      } else {
        schemaFields[field.id] = field.required 
          ? z.string().min(1, `${field.label} é obrigatório`)
          : z.string().optional();
      }
    });

    return z.object(schemaFields);
  };

  const schema = createSchema(template.fields);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      requiresPayment: template.defaultPrice > 0,
      price: template.defaultPrice,
    },
  });

  const requiresPayment = watch('requiresPayment') as boolean;

  const renderField = (field: TemplateField) => {
    const error = errors[field.id];

    switch (field.type) {
      case 'select':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              {...register(field.id)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Selecione...</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error.message as string}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              {...register(field.id)}
              rows={4}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message as string}</p>}
          </div>
        );

      case 'number':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              {...register(field.id, { valueAsNumber: true })}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message as string}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register(field.id)}
              id={field.id}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor={field.id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {error && <p className="text-red-500 text-sm mt-1">{error.message as string}</p>}
          </div>
        );

      default:
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              {...register(field.id)}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message as string}</p>}
          </div>
        );
    }
  };

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    // Gerar título e corpo do laudo baseado no template
    const title = `${template.name} - ${patients.find(p => p.id === data.patientId)?.name}`;
    const body = template.fields.map(field => {
      const value = data[field.id];
      if (value) {
        return `${field.label}: ${value}`;
      }
      return null;
    }).filter(Boolean).join('\n\n');

    await onSubmit({
      ...data,
      title,
      body,
      templateId: template.id,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          startIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Voltar
        </Button>
        <div className="flex items-center gap-3">
          <div className="text-2xl">{template.icon}</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {template.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Preencha os campos abaixo para gerar o laudo
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Informações do Paciente
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paciente <span className="text-red-500">*</span>
              </label>
              <select
                {...register('patientId')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Selecione um paciente</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.phone}
                  </option>
                ))}
              </select>
              {errors.patientId && (
                <p className="text-red-500 text-sm mt-1">{errors.patientId.message as string}</p>
              )}
            </div>

            <div className="flex items-center space-x-4">
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
                  Valor (R$) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message as string}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Dados do Exame
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {template.fields.map(renderField)}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            startIcon={<Save className="w-4 h-4" />}
            className="flex-1 md:flex-none"
          >
            {loading ? 'Gerando Laudo...' : 'Gerar Laudo'}
          </Button>
        </div>
      </form>
    </div>
  );
}