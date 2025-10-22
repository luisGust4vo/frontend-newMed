'use client';

import { useState } from 'react';
import { Zap, Crown, Filter } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { quickActions } from '@/lib/quick-actions';

export function QuickActionsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const categories = [
    { id: 'all', name: 'Todas', icon: '🚀' },
    { id: 'communication', name: 'Comunicação', icon: '💬' },
    { id: 'scheduling', name: 'Agendamento', icon: '📅' },
    { id: 'billing', name: 'Cobrança', icon: '💰' },
    { id: 'clinical', name: 'Clínico', icon: '🏥' }
  ];

  const filteredActions = quickActions.filter(action => {
    const categoryMatch = selectedCategory === 'all' || action.category === selectedCategory;
    const premiumMatch = !showPremiumOnly || action.premium;
    return categoryMatch && premiumMatch;
  });

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'from-green-500 to-emerald-500',
      blue: 'from-blue-500 to-cyan-500',
      orange: 'from-orange-500 to-red-500',
      pink: 'from-pink-500 to-rose-500',
      teal: 'from-teal-500 to-cyan-500',
      purple: 'from-purple-500 to-indigo-500',
      red: 'from-red-500 to-pink-500',
      yellow: 'from-yellow-500 to-orange-500'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Ações Rápidas
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Execute tarefas repetitivas com um clique. Economize tempo e melhore a eficiência.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                showPremiumOnly
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Crown className="w-4 h-4" />
              Premium
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredActions.length} ações
            </div>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredActions.map((action) => (
          <div
            key={action.id}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={action.action}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${getColorClasses(action.color)} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              
              <div className="flex items-center gap-1">
                {action.premium && (
                  <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Crown className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
                {action.shortcut && (
                  <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-mono text-gray-600 dark:text-gray-400">
                    {action.shortcut}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {action.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  action.category === 'communication' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                  action.category === 'scheduling' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                  action.category === 'billing' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                  'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                }`}>
                  {action.category === 'communication' && '💬'}
                  {action.category === 'scheduling' && '📅'}
                  {action.category === 'billing' && '💰'}
                  {action.category === 'clinical' && '🏥'}
                </span>
                
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  action.specialty === 'medical' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                  action.specialty === 'dental' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {action.specialty === 'medical' && '🩺'}
                  {action.specialty === 'dental' && '🦷'}
                  {action.specialty === 'both' && '🏥'}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >
                Executar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredActions.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhuma ação encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou explore outras categorias
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">
          ⚡ Automatize Sua Prática
        </h3>
        <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
          Transforme tarefas repetitivas em ações automáticas. Configure uma vez e economize horas toda semana.
        </p>
        <Button
          variant="primary"
          className="bg-white text-orange-600 hover:bg-gray-100"
        >
          Configurar Automações
        </Button>
      </div>
    </div>
  );
}