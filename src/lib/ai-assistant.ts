export interface AIAnalysis {
  confidence: number;
  suggestions: string[];
  diagnosis: string[];
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface AITemplate {
  id: string;
  name: string;
  specialty: 'medical' | 'dental';
  description: string;
  aiPrompt: string;
  fields: string[];
}

// IA Templates para geração automática
export const aiTemplates: AITemplate[] = [
  {
    id: 'blood-analysis',
    name: 'Análise de Sangue com IA',
    specialty: 'medical',
    description: 'IA analisa resultados e sugere diagnósticos',
    aiPrompt: 'Analise os resultados de sangue e forneça diagnóstico preliminar',
    fields: ['hemoglobin', 'glucose', 'cholesterol', 'white_cells']
  },
  {
    id: 'xray-analysis',
    name: 'Análise de Raio-X com IA',
    specialty: 'medical',
    description: 'IA identifica anomalias em imagens',
    aiPrompt: 'Analise a imagem de raio-x e identifique possíveis anomalias',
    fields: ['image_url', 'region', 'symptoms']
  },
  {
    id: 'dental-analysis',
    name: 'Análise Odontológica com IA',
    specialty: 'dental',
    description: 'IA avalia condição dental e sugere tratamentos',
    aiPrompt: 'Avalie a condição dental e sugira plano de tratamento',
    fields: ['oral_hygiene', 'gum_condition', 'teeth_condition']
  }
];

// Simulação de IA (em produção seria integração com OpenAI/Claude)
export const analyzeWithAI = async (template: AITemplate, data: Record<string, string>): Promise<AIAnalysis> => {
  // Simula delay da IA
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock de análise baseada no template
  if (template.id === 'blood-analysis') {
    const glucose = parseFloat(data.glucose) || 0;
    const hemoglobin = parseFloat(data.hemoglobin) || 0;
    
    return {
      confidence: 0.92,
      suggestions: [
        glucose > 100 ? 'Glicose elevada - investigar diabetes' : 'Glicose normal',
        hemoglobin < 12 ? 'Hemoglobina baixa - possível anemia' : 'Hemoglobina normal',
        'Solicitar exames complementares se necessário'
      ],
      diagnosis: [
        glucose > 126 ? 'Diabetes Mellitus (suspeita)' : 'Glicemia normal',
        hemoglobin < 12 ? 'Anemia (suspeita)' : 'Hemograma normal'
      ],
      recommendations: [
        'Acompanhamento médico regular',
        'Dieta balanceada',
        'Exercícios físicos regulares'
      ],
      urgency: glucose > 200 || hemoglobin < 8 ? 'high' : 'medium'
    };
  }
  
  if (template.id === 'dental-analysis') {
    return {
      confidence: 0.88,
      suggestions: [
        'Melhorar higiene oral',
        'Limpeza profissional recomendada',
        'Avaliação ortodôntica se necessário'
      ],
      diagnosis: [
        'Gengivite leve',
        'Placa bacteriana presente',
        'Cáries iniciais detectadas'
      ],
      recommendations: [
        'Escovação 3x ao dia',
        'Uso de fio dental diário',
        'Retorno em 6 meses'
      ],
      urgency: 'medium'
    };
  }
  
  return {
    confidence: 0.85,
    suggestions: ['Análise realizada com sucesso'],
    diagnosis: ['Resultados dentro da normalidade'],
    recommendations: ['Acompanhamento de rotina'],
    urgency: 'low'
  };
};