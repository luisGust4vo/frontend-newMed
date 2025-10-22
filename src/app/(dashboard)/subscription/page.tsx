'use client';

import { useState } from 'react';
import { Crown, TrendingUp, Users, Zap } from 'lucide-react';
import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { subscriptionPlans, getCurrentSubscription, getUsagePercentage } from '@/lib/subscription';
import { useToast } from '@/hooks/useToast';

export default function SubscriptionPage() {
  const [currentSubscription] = useState(getCurrentSubscription());
  const { success } = useToast();

  const handleSelectPlan = (planId: string) => {
    success(`Redirecionando para pagamento do plano ${planId}...`);
  };

  const currentPlan = subscriptionPlans.find(p => p.id === currentSubscription.planId);

  return (
    <ProtectedShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Planos Premium
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Escolha o plano ideal para sua prática médica e desbloqueie todo o potencial da plataforma
          </p>
        </div>

        {/* Current Plan Status */}
        {currentSubscription.status === 'trial' && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">🔥 Período de Teste</h3>
            <p className="mb-4">
              Você tem {Math.ceil((new Date(currentSubscription.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias restantes no seu teste gratuito
            </p>
            <p className="text-sm opacity-90">
              Escolha um plano para continuar usando todas as funcionalidades
            </p>
          </div>
        )}

        {/* Usage Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Seu Uso Atual
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-2xl p-4 mb-3">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {currentSubscription.usage.reports}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Laudos criados
                </div>
              </div>
              {currentPlan && currentPlan.limits.reports !== -1 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getUsagePercentage(currentSubscription.usage.reports, currentPlan.limits.reports)}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-2xl p-4 mb-3">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {currentSubscription.usage.patients}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Pacientes
                </div>
              </div>
              {currentPlan && currentPlan.limits.patients !== -1 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getUsagePercentage(currentSubscription.usage.patients, currentPlan.limits.patients)}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 rounded-2xl p-4 mb-3">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {currentSubscription.usage.aiAnalysis}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Análises IA
                </div>
              </div>
              {currentPlan && currentPlan.limits.aiAnalysis !== -1 && currentPlan.limits.aiAnalysis > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getUsagePercentage(currentSubscription.usage.aiAnalysis, currentPlan.limits.aiAnalysis)}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 rounded-2xl p-4 mb-3">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {currentSubscription.usage.whatsappMessages}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  WhatsApp enviados
                </div>
              </div>
              {currentPlan && currentPlan.limits.whatsappMessages !== -1 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getUsagePercentage(currentSubscription.usage.whatsappMessages, currentPlan.limits.whatsappMessages)}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => (
            <SubscriptionCard
              key={plan.id}
              plan={plan}
              currentPlan={plan.id === currentSubscription.planId}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Compare os Recursos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-2xl p-6 mb-4">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Para Iniciantes
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ideal para profissionais que estão começando a digitalizar sua prática
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 rounded-2xl p-6 mb-4">
                <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Para Profissionais
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Recursos avançados com IA e automação para máxima eficiência
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl p-6 mb-4">
                <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Para Clínicas
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Solução completa para clínicas com múltiplos profissionais
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedShell>
  );
}