'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, FileText } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { ReportCard } from '@/components/ReportCard';
import { Report } from '@/lib/types';
import { getMyReports } from '@/lib/api';
import { useToast } from '@/hooks/useToast';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { error } = useToast();

  const fetchReports = async () => {
    try {
      const data = await getMyReports();
      setReports(data);
    } catch {
      error('Erro ao carregar laudos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [error]);

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.patient?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <ProtectedShell>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </ProtectedShell>
    );
  }

  return (
    <ProtectedShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Meus Laudos
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie todos os seus laudos médicos e odontológicos
            </p>
          </div>
          <Link href="/reports/create">
            <Button
              variant="primary"
              startIcon={<Plus className="w-5 h-5" />}
              className="px-6 py-3 text-base shadow-lg hover:shadow-xl transition-shadow"
            >
              Novo Laudo
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por título, paciente ou tipo de exame..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm">
                <option value="">Todos os status</option>
                <option value="ready">Prontos</option>
                <option value="pending_payment">Pendentes</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm">
                <option value="">Todos os tipos</option>
                <option value="medical">Médicos</option>
                <option value="dental">Odontológicos</option>
              </select>
            </div>
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-12 max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
                <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {searchTerm ? 'Nenhum laudo encontrado' : 'Seus laudos aparecerão aqui'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {searchTerm 
                  ? 'Tente ajustar os termos de busca ou criar um novo laudo'
                  : 'Comece criando seu primeiro laudo médico ou odontológico usando nossos templates profissionais'
                }
              </p>
              <Link href="/reports/create">
                <Button
                  variant="primary"
                  startIcon={<Plus className="w-5 h-5" />}
                  className="px-8 py-3 text-base"
                >
                  {searchTerm ? 'Criar Novo Laudo' : 'Criar Primeiro Laudo'}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredReports.length} {filteredReports.length === 1 ? 'laudo encontrado' : 'laudos encontrados'}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Pronto</span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full ml-4"></div>
                <span>Pendente</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onUpdate={fetchReports}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </ProtectedShell>
  );
}