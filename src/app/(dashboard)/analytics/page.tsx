'use client';

import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Target } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <ProtectedShell>
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Analytics Avançado
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Insights inteligentes para otimizar sua prática médica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">R$ 45.2k</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Receita Mensal</div>
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +23% vs mês anterior
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">342</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pacientes Ativos</div>
              </div>
            </div>
            <div className="flex items-center text-blue-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% vs mês anterior
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">89%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Taxa Comparecimento</div>
              </div>
            </div>
            <div className="flex items-center text-purple-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5% vs mês anterior
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfação Média</div>
              </div>
            </div>
            <div className="flex items-center text-orange-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              Excelente!
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🚀 Em Desenvolvimento</h3>
          <p className="text-blue-100 mb-6">
            Analytics completo com gráficos interativos, previsões com IA e relatórios personalizados chegando em breve!
          </p>
        </div>
      </div>
    </ProtectedShell>
  );
}