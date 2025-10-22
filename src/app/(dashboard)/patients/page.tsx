'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  User, 
  Phone, 
  Calendar, 
  AlertTriangle,
  DollarSign,
  Star,
  MessageCircle,
  Eye,
  MoreVertical,
  Target,
  Zap
} from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { PatientForm } from '@/components/PatientForm';
import { Patient } from '@/lib/types';
import { listPatients, createPatient } from '@/lib/api';
import { PatientFormData } from '@/lib/validators';
import { useToast } from '@/hooks/useToast';
import { generatePatientInsights, generatePatientStats, PatientInsight, PatientStats } from '@/lib/patient-insights';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  console.log(selectedPatient); // Para evitar warning
  const [patientInsights, setPatientInsights] = useState<Record<string, PatientInsight[]>>({});
  const [patientStats, setPatientStats] = useState<Record<string, PatientStats>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { success, error } = useToast();

  const fetchPatients = async () => {
    try {
      const data = await listPatients();
      setPatients(data);
      
      // Gerar insights e stats para cada paciente
      const insights: Record<string, PatientInsight[]> = {};
      const stats: Record<string, PatientStats> = {};
      
      data.forEach(patient => {
        insights[patient.id] = generatePatientInsights(patient.id);
        stats[patient.id] = generatePatientStats();
      });
      
      setPatientInsights(insights);
      setPatientStats(stats);
    } catch {
      error('Erro ao carregar pacientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [error]);

  const handleSubmit = async (data: PatientFormData) => {
    setSubmitting(true);
    try {
      await createPatient(data);
      success('Paciente cadastrado com sucesso!');
      setShowForm(false);
      fetchPatients();
    } catch {
      error('Erro ao cadastrar paciente');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <ProtectedShell>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </ProtectedShell>
    );
  }

  return (
    <ProtectedShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Meus Pacientes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie pacientes com insights inteligentes e automação
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              startIcon={<Target className="w-4 h-4" />}
              className="px-6 py-3"
            >
              Insights
            </Button>
            <Button
              variant="primary"
              startIcon={<Plus className="w-5 h-5" />}
              onClick={() => setShowForm(true)}
              className="px-6 py-3 text-base shadow-lg hover:shadow-xl transition-shadow"
            >
              Novo Paciente
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Cadastrar Novo Paciente
            </h2>
            <PatientForm
              onSubmit={handleSubmit}
              loading={submitting}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome, telefone ou insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm">
                <option value="">Todos os pacientes</option>
                <option value="high_risk">Alto risco</option>
                <option value="high_value">Alto valor</option>
                <option value="recent">Recentes</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm">
                <option value="">Ordenar por</option>
                <option value="name">Nome</option>
                <option value="last_visit">Última visita</option>
                <option value="total_spent">Valor gasto</option>
                <option value="risk_score">Risco</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Lista
            </button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredPatients.length} {filteredPatients.length === 1 ? 'paciente' : 'pacientes'}
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-12 max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
                <User className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {searchTerm ? 'Nenhum paciente encontrado' : 'Seus pacientes aparecerão aqui'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {searchTerm 
                  ? 'Tente ajustar os termos de busca ou cadastrar um novo paciente'
                  : 'Comece cadastrando seu primeiro paciente e acompanhe todo o histórico de tratamentos'
                }
              </p>
              <Button
                variant="primary"
                startIcon={<Plus className="w-5 h-5" />}
                onClick={() => setShowForm(true)}
                className="px-8 py-3 text-base"
              >
                {searchTerm ? 'Cadastrar Paciente' : 'Cadastrar Primeiro Paciente'}
              </Button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => {
              const insights = patientInsights[patient.id] || [];
              const stats = patientStats[patient.id];
              const highPriorityInsights = insights.filter(i => i.priority === 'high' || i.priority === 'critical');
              
              return (
                <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                     onClick={() => setSelectedPatient(patient)}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        {stats && stats.riskScore > 70 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {patient.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="w-3 h-3" />
                          <span className="truncate">{patient.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Stats */}
                  {stats && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Visitas</span>
                        </div>
                        <div className="text-lg font-bold text-blue-900 dark:text-blue-300">
                          {stats.totalVisits}
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-medium text-green-700 dark:text-green-400">Gasto</span>
                        </div>
                        <div className="text-lg font-bold text-green-900 dark:text-green-300">
                          R$ {stats.totalSpent.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Insights */}
                  {highPriorityInsights.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-medium text-orange-700 dark:text-orange-400">Alertas</span>
                      </div>
                      <div className="space-y-1">
                        {highPriorityInsights.slice(0, 2).map((insight) => (
                          <div key={insight.id} className="text-xs text-gray-600 dark:text-gray-400 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                            {insight.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      startIcon={<MessageCircle className="w-3 h-3" />}
                      className="flex-1 text-xs"
                    >
                      WhatsApp
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      startIcon={<Eye className="w-3 h-3" />}
                      className="flex-1 text-xs"
                    >
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPatients.map((patient) => {
                const stats = patientStats[patient.id];
                const insights = patientInsights[patient.id] || [];
                const riskInsights = insights.filter(i => i.type === 'risk');
                
                return (
                  <div key={patient.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                       onClick={() => setSelectedPatient(patient)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          {stats && stats.riskScore > 70 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                              <AlertTriangle className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {patient.name}
                            </h3>
                            {riskInsights.length > 0 && (
                              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                                {riskInsights.length} alerta{riskInsights.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <span>{patient.phone}</span>
                            </div>
                            {stats && (
                              <>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{stats.totalVisits} visitas</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  <span>R$ {stats.totalSpent.toLocaleString()}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {stats && (
                          <div className="text-right mr-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {stats.satisfactionScore.toFixed(1)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Satisfação
                            </div>
                          </div>
                        )}
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(patient.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ProtectedShell>
  );
}