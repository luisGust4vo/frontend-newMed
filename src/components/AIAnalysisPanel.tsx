'use client';

import { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Target
} from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { AIAnalysis, analyzeWithAI, aiTemplates } from '@/lib/ai-assistant';

interface AIAnalysisPanelProps {
  data: Record<string, string>;
  templateId?: string;
  onAnalysisComplete: (analysis: AIAnalysis) => void;
}

export function AIAnalysisPanel({ data, templateId, onAnalysisComplete }: AIAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const template = aiTemplates.find(t => t.id === templateId);

  const handleAnalyze = async () => {
    if (!template) return;
    
    setLoading(true);
    try {
      const result = await analyzeWithAI(template, data);
      setAnalysis(result);
      onAnalysisComplete(result);
    } catch (error) {
      console.error('Erro na análise:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: AIAnalysis['urgency']) => {
    const colors = {
      low: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20',
      high: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20',
      critical: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    };
    return colors[urgency];
  };

  const getUrgencyIcon = (urgency: AIAnalysis['urgency']) => {
    const icons = {
      low: <CheckCircle className="w-4 h-4" />,
      medium: <Clock className="w-4 h-4" />,
      high: <AlertTriangle className="w-4 h-4" />,
      critical: <AlertTriangle className="w-4 h-4" />
    };
    return icons[urgency];
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl p-6 border border-purple-200 dark:border-purple-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Análise com IA
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {template?.description || 'Análise inteligente dos dados'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium rounded-full">
            IA Premium
          </span>
          <Sparkles className="w-5 h-5 text-purple-500" />
        </div>
      </div>

      {!analysis && !loading && (
        <div className="text-center py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-4">
            <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Pronto para Análise
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Nossa IA analisará os dados e fornecerá insights profissionais
            </p>
            <Button
              variant="primary"
              onClick={handleAnalyze}
              startIcon={<Brain className="w-4 h-4" />}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              Analisar com IA
            </Button>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Analisando...
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Nossa IA está processando os dados
            </p>
          </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Confiança e Urgência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">Confiança</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.confidence * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(analysis.confidence * 100)}%
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-gray-900 dark:text-white">Urgência</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(analysis.urgency)}`}>
                {getUrgencyIcon(analysis.urgency)}
                {analysis.urgency.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Diagnósticos */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Diagnósticos Sugeridos
            </h4>
            <div className="space-y-2">
              {analysis.diagnosis.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sugestões */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Sugestões da IA
            </h4>
            <div className="space-y-2">
              {analysis.suggestions.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendações */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Recomendações
            </h4>
            <div className="space-y-2">
              {analysis.recommendations.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setAnalysis(null)}
              className="flex-1"
            >
              Nova Análise
            </Button>
            <Button
              variant="primary"
              onClick={() => onAnalysisComplete(analysis)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              Aplicar ao Laudo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}