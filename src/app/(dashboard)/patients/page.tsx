'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, User, Phone, Calendar } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { PatientForm } from '@/components/PatientForm';
import { Patient } from '@/lib/types';
import { listPatients, createPatient } from '@/lib/api';
import { PatientFormData } from '@/lib/validators';
import { useToast } from '@/hooks/useToast';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { success, error } = useToast();

  const fetchPatients = async () => {
    try {
      const data = await listPatients();
      setPatients(data);
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Pacientes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gerencie seus pacientes
            </p>
          </div>
          <Button
            variant="primary"
            startIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowForm(true)}
          >
            Novo Paciente
          </Button>
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

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm 
                ? 'Tente ajustar os termos de busca'
                : 'Comece cadastrando seu primeiro paciente'
              }
            </p>
            {!searchTerm && (
              <Button
                variant="primary"
                startIcon={<Plus className="w-4 h-4" />}
                onClick={() => setShowForm(true)}
              >
                Cadastrar Primeiro Paciente
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {patient.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <Phone className="w-4 h-4 mr-1" />
                          {patient.phone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(patient.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedShell>
  );
}