'use client';

import { useState } from 'react';
import { Search, Stethoscope, Heart } from 'lucide-react';
import { ReportTemplate, getAllTemplates } from '@/lib/templates';

interface TemplateSelectorProps {
  onSelect: (template: ReportTemplate) => void;
  selectedCategory?: 'medical' | 'dental' | 'all';
}

export function TemplateSelector({ onSelect, selectedCategory = 'all' }: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<'medical' | 'dental' | 'all'>(selectedCategory);
  
  const allTemplates = getAllTemplates();
  
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || template.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar template..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              category === 'all'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setCategory('medical')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              category === 'medical'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Médico
          </button>
          <button
            onClick={() => setCategory('dental')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              category === 'dental'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            Odonto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 text-left group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">{template.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {template.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {template.category === 'medical' ? (
                    <Stethoscope className="w-3 h-3 text-blue-500" />
                  ) : (
                    <Heart className="w-3 h-3 text-green-500" />
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {template.category === 'medical' ? 'Médico' : 'Odontológico'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {template.fields.length} campos • R$ {template.defaultPrice.toFixed(2)}
            </div>
            
            <div className="flex flex-wrap gap-1">
              {template.fields.slice(0, 3).map((field) => (
                <span
                  key={field.id}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-md"
                >
                  {field.label}
                </span>
              ))}
              {template.fields.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-500">
                  +{template.fields.length - 3} mais
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum template encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tente ajustar os filtros ou termo de busca
          </p>
        </div>
      )}
    </div>
  );
}