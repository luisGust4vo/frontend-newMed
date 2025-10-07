'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { TemplateSelector } from '@/components/TemplateSelector';
import { TemplateForm } from '@/components/TemplateForm';
import { ReportTemplate } from '@/lib/templates';
import { Patient } from '@/lib/types';
import { createReport, listPatients } from '@/lib/api';
import { useToast } from '@/hooks/useToast';

export default function CreateReportPage() {
  const [step, setStep] = useState<'template' | 'form'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const router = useRouter();
  const { success, error } = useToast();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await listPatients();
        setPatients(data);
      } catch {
        error('Erro ao carregar pacientes');
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, [error]);

  const handleTemplateSelect = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    setStep('form');
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    setLoading(true);
    try {
      const result = await createReport(data);
      success('Laudo criado com sucesso!');
      
      if (result.checkoutUrl) {
        console.log('Checkout URL:', result.checkoutUrl);
      }
      
      router.push('/reports');
    } catch {
      error('Erro ao criar laudo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'form') {
      setStep('template');
      setSelectedTemplate(null);
    } else {
      router.push('/reports');
    }
  };

  if (loadingPatients) {
    return (
      <ProtectedShell>
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </ProtectedShell>
    );
  }

  return (
    <ProtectedShell>
      <div className="max-w-6xl mx-auto space-y-8">
        {step === 'template' ? (
          <>
            <div className="flex items-center gap-4">
              <Link href="/reports">
                <Button
                  variant="outline"
                  size="sm"
                  startIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Novo Laudo
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Escolha um template para começar
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <TemplateSelector onSelect={handleTemplateSelect} />
            </div>
          </>
        ) : (
          selectedTemplate && (
            <TemplateForm
              template={selectedTemplate}
              patients={patients}
              onSubmit={handleSubmit}
              onBack={handleBack}
              loading={loading}
            />
          )
        )}
      </div>
    </ProtectedShell>
  );
}