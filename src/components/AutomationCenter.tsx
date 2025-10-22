'use client';

import { useState } from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Clock, 
  MessageCircle,
  Target,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { automationWorkflows, getWorkflowStats } from '@/lib/automation-workflows';

export function AutomationCenter() {
  const [workflows, setWorkflows] = useState(automationWorkflows);
  const stats = getWorkflowStats();

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    ));
  };

  const getColorClasses = (color: string) => {
    const colors = {
      orange: 'from-orange-500 to-red-500',
      blue: 'from-blue-500 to-cyan-500',
      pink: 'from-pink-500 to-rose-500',
      green: 'from-green-500 to-emerald-500',
      red: 'from-red-500 to-pink-500'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Central de Automação
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Automatize tarefas repetitivas e melhore a experiência dos seus pacientes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalActive}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Workflows Ativos
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalTriggered}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Execuções Este Mês
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.averageSuccessRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Taxa de Sucesso
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.timeSaved}h
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tempo Economizado
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-r ${getColorClasses(workflow.color)} rounded-2xl shadow-lg`}>
                  <span className="text-2xl">{workflow.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {workflow.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {workflow.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWorkflow(workflow.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    workflow.isActive
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {workflow.isActive ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
                <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {workflow.timesTriggered}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Execuções
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {workflow.successRate}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Sucesso
                </div>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  workflow.isActive
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {workflow.isActive ? 'Ativo' : 'Pausado'}
                </div>
              </div>
            </div>

            {/* Actions Preview */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                Ações Automáticas:
              </h4>
              {workflow.actions.slice(0, 2).map((action, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    {action.type === 'whatsapp' && <MessageCircle className="w-4 h-4 text-green-500" />}
                    {action.type === 'email' && <MessageCircle className="w-4 h-4 text-blue-500" />}
                    {action.type === 'discount_offer' && <Target className="w-4 h-4 text-orange-500" />}
                    {action.type === 'call_reminder' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {action.type === 'whatsapp' && 'WhatsApp'}
                      {action.type === 'email' && 'Email'}
                      {action.type === 'discount_offer' && 'Oferta Desconto'}
                      {action.type === 'call_reminder' && 'Lembrete Ligação'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {action.delay === 0 ? 'Imediato' : `${action.delay} min depois`}
                    </div>
                  </div>
                </div>
              ))}
              {workflow.actions.length > 2 && (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  +{workflow.actions.length - 2} ações adicionais
                </div>
              )}
            </div>

            {/* Specialty Badge */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  workflow.specialty === 'medical'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : workflow.specialty === 'dental'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                }`}>
                  {workflow.specialty === 'medical' && '🩺 Médico'}
                  {workflow.specialty === 'dental' && '🦷 Odonto'}
                  {workflow.specialty === 'both' && '🏥 Ambos'}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Personalizar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">
          🚀 Economize 20+ horas por semana
        </h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          Nossa automação inteligente cuida das tarefas repetitivas enquanto você foca no que realmente importa: cuidar dos seus pacientes.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Ver Tutorial
          </Button>
          <Button
            variant="primary"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Criar Workflow
          </Button>
        </div>
      </div>
    </div>
  );
}