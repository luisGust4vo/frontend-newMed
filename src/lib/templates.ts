export interface ReportTemplate {
  id: string;
  name: string;
  category: 'medical' | 'dental';
  icon: string;
  fields: TemplateField[];
  defaultPrice: number;
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export const medicalTemplates: ReportTemplate[] = [
  {
    id: 'blood-test',
    name: 'Exame de Sangue',
    category: 'medical',
    icon: '🩸',
    defaultPrice: 150,
    fields: [
      { id: 'hemoglobin', label: 'Hemoglobina', type: 'text', required: true, placeholder: 'Ex: 14.5 g/dL' },
      { id: 'glucose', label: 'Glicose', type: 'text', required: true, placeholder: 'Ex: 95 mg/dL' },
      { id: 'cholesterol', label: 'Colesterol Total', type: 'text', required: false, placeholder: 'Ex: 180 mg/dL' },
      { id: 'observations', label: 'Observações', type: 'textarea', required: false, placeholder: 'Observações adicionais...' }
    ]
  },
  {
    id: 'xray',
    name: 'Raio-X',
    category: 'medical',
    icon: '🦴',
    defaultPrice: 120,
    fields: [
      { id: 'region', label: 'Região Examinada', type: 'select', required: true, options: ['Tórax', 'Abdome', 'Membros', 'Coluna', 'Crânio'] },
      { id: 'findings', label: 'Achados', type: 'textarea', required: true, placeholder: 'Descreva os achados radiológicos...' },
      { id: 'conclusion', label: 'Conclusão', type: 'textarea', required: true, placeholder: 'Conclusão diagnóstica...' }
    ]
  },
  {
    id: 'ecg',
    name: 'Eletrocardiograma',
    category: 'medical',
    icon: '💓',
    defaultPrice: 80,
    fields: [
      { id: 'rhythm', label: 'Ritmo', type: 'select', required: true, options: ['Sinusal', 'Fibrilação Atrial', 'Flutter Atrial', 'Outro'] },
      { id: 'frequency', label: 'Frequência (bpm)', type: 'number', required: true, placeholder: '70' },
      { id: 'axis', label: 'Eixo Elétrico', type: 'text', required: false, placeholder: 'Normal, Desviado à esquerda, etc.' },
      { id: 'interpretation', label: 'Interpretação', type: 'textarea', required: true, placeholder: 'Interpretação do ECG...' }
    ]
  }
];

export const dentalTemplates: ReportTemplate[] = [
  {
    id: 'dental-exam',
    name: 'Exame Clínico Odontológico',
    category: 'dental',
    icon: '🦷',
    defaultPrice: 100,
    fields: [
      { id: 'chief_complaint', label: 'Queixa Principal', type: 'textarea', required: true, placeholder: 'Motivo da consulta...' },
      { id: 'oral_hygiene', label: 'Higiene Oral', type: 'select', required: true, options: ['Boa', 'Regular', 'Deficiente'] },
      { id: 'gums', label: 'Estado Gengival', type: 'select', required: true, options: ['Saudável', 'Gengivite', 'Periodontite'] },
      { id: 'teeth_condition', label: 'Condição Dentária', type: 'textarea', required: true, placeholder: 'Descreva o estado dos dentes...' },
      { id: 'treatment_plan', label: 'Plano de Tratamento', type: 'textarea', required: true, placeholder: 'Tratamentos recomendados...' }
    ]
  },
  {
    id: 'dental-xray',
    name: 'Radiografia Odontológica',
    category: 'dental',
    icon: '📷',
    defaultPrice: 60,
    fields: [
      { id: 'xray_type', label: 'Tipo de Radiografia', type: 'select', required: true, options: ['Periapical', 'Panorâmica', 'Bite-wing', 'Oclusal'] },
      { id: 'region', label: 'Região/Dente', type: 'text', required: true, placeholder: 'Ex: Dente 16, Região anterior, etc.' },
      { id: 'findings', label: 'Achados Radiográficos', type: 'textarea', required: true, placeholder: 'Descreva os achados...' },
      { id: 'diagnosis', label: 'Diagnóstico', type: 'textarea', required: true, placeholder: 'Diagnóstico baseado na imagem...' }
    ]
  },
  {
    id: 'orthodontic',
    name: 'Avaliação Ortodôntica',
    category: 'dental',
    icon: '🔧',
    defaultPrice: 200,
    fields: [
      { id: 'facial_analysis', label: 'Análise Facial', type: 'textarea', required: true, placeholder: 'Análise do perfil facial...' },
      { id: 'occlusion', label: 'Oclusão', type: 'select', required: true, options: ['Classe I', 'Classe II', 'Classe III'] },
      { id: 'crowding', label: 'Apinhamento', type: 'select', required: true, options: ['Ausente', 'Leve', 'Moderado', 'Severo'] },
      { id: 'treatment_plan', label: 'Plano Ortodôntico', type: 'textarea', required: true, placeholder: 'Plano de tratamento ortodôntico...' }
    ]
  }
];

export const getAllTemplates = (): ReportTemplate[] => [...medicalTemplates, ...dentalTemplates];