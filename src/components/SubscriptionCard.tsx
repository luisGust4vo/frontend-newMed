'use client';

import { Crown, Check, Zap, Star } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { SubscriptionPlan } from '@/lib/subscription';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  currentPlan?: boolean;
  onSelect: (planId: string) => void;
}

export function SubscriptionCard({ plan, currentPlan = false, onSelect }: SubscriptionCardProps) {
  const getColorClasses = () => {
    const colors = {
      blue: {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-600 dark:text-blue-400'
      },
      purple: {
        gradient: 'from-purple-500 to-indigo-600',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        text: 'text-purple-600 dark:text-purple-400'
      },
      gold: {
        gradient: 'from-yellow-500 to-orange-500',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-200 dark:border-yellow-800',
        text: 'text-yellow-600 dark:text-yellow-400'
      }
    };
    return colors[plan.color as keyof typeof colors] || colors.blue;
  };

  const colorClasses = getColorClasses();

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 hover:scale-105 ${
      plan.popular 
        ? 'border-purple-300 dark:border-purple-600 ring-4 ring-purple-100 dark:ring-purple-900/30' 
        : colorClasses.border
    }`}>
      
      {/* Badge Popular */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            <Star className="w-4 h-4" />
            MAIS POPULAR
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${colorClasses.gradient} shadow-lg mb-4`}>
          {plan.id === 'enterprise' ? (
            <Crown className="w-8 h-8 text-white" />
          ) : plan.id === 'professional' ? (
            <Zap className="w-8 h-8 text-white" />
          ) : (
            <Star className="w-8 h-8 text-white" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {plan.name}
        </h3>
        
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            R$ {plan.price.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            /{plan.interval === 'monthly' ? 'mês' : 'ano'}
          </span>
        </div>
        
        {plan.interval === 'yearly' && (
          <div className="mt-2">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              Economize 20%
            </span>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`p-1 rounded-full ${colorClasses.bg} flex-shrink-0 mt-0.5`}>
              <Check className={`w-4 h-4 ${colorClasses.text}`} />
            </div>
            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Limits */}
      <div className={`${colorClasses.bg} rounded-2xl p-4 mb-8`}>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
          Limites Inclusos:
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Laudos:</span>
            <span className="font-medium text-gray-900 dark:text-white ml-1">
              {plan.limits.reports === -1 ? 'Ilimitado' : plan.limits.reports}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Pacientes:</span>
            <span className="font-medium text-gray-900 dark:text-white ml-1">
              {plan.limits.patients === -1 ? 'Ilimitado' : plan.limits.patients}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">IA:</span>
            <span className="font-medium text-gray-900 dark:text-white ml-1">
              {plan.limits.aiAnalysis === -1 ? 'Ilimitado' : plan.limits.aiAnalysis || 'Não incluso'}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Storage:</span>
            <span className="font-medium text-gray-900 dark:text-white ml-1">
              {plan.limits.storage}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        variant={currentPlan ? "outline" : "primary"}
        onClick={() => onSelect(plan.id)}
        className={`w-full py-4 text-base font-semibold ${
          !currentPlan && plan.popular 
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg' 
            : ''
        }`}
        disabled={currentPlan}
      >
        {currentPlan ? 'Plano Atual' : `Escolher ${plan.name}`}
      </Button>

      {/* Trial Info */}
      {!currentPlan && plan.id === 'professional' && (
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
          7 dias grátis • Cancele quando quiser
        </p>
      )}
    </div>
  );
}