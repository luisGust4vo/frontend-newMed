'use client';

import { useState } from 'react';
import { 
  Download, 
  MessageCircle, 
  Calendar, 
  User, 
  DollarSign, 
  Eye,
  MoreVertical,
  Stethoscope,
  Heart,
  Clock
} from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { WhatsappSendDialog } from './WhatsappSendDialog';
import { Report } from '@/lib/types';
import { downloadReport, sendPayment } from '@/lib/api';
import { useToast } from '@/hooks/useToast';

interface ReportCardProps {
  report: Report;
  onUpdate?: () => void;
}

export function ReportCard({ report, onUpdate }: ReportCardProps) {
  const [showWhatsappDialog, setShowWhatsappDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { success, error } = useToast();

  const handleDownload = () => {
    try {
      downloadReport(report.id);
      success('Download iniciado');
    } catch {
      error('Erro ao fazer download');
    }
  };

  const handleSendPayment = async (phone: string) => {
    try {
      await sendPayment(report.id, phone);
      success('Cobrança enviada via WhatsApp');
      onUpdate?.();
    } catch (err) {
      error('Erro ao enviar cobrança');
      throw err;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportIcon = () => {
    const title = report.title.toLowerCase();
    if (title.includes('dental') || title.includes('odonto') || title.includes('dente')) {
      return <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />;
    }
    return <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
  };

  const getStatusColor = () => {
    return report.status === 'ready' 
      ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10'
      : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10';
  };

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group ${getStatusColor()}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
              {getReportIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {report.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{report.patient?.name || 'Paciente não encontrado'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <PaymentStatusBadge status={report.status} />
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(report.createdAt)}</span>
            </div>
            {report.requiresPayment && (
              <div className="flex items-center gap-1 font-semibold text-green-600 dark:text-green-400">
                <DollarSign className="w-4 h-4" />
                <span>R$ {report.price.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Preview do conteúdo */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {report.body.substring(0, 120)}...
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          {report.status === 'ready' ? (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDownload}
                startIcon={<Download className="w-4 h-4" />}
                className="flex-1"
              >
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(true)}
                startIcon={<Eye className="w-4 h-4" />}
              >
                Visualizar
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowWhatsappDialog(true)}
                startIcon={<MessageCircle className="w-4 h-4" />}
                className="flex-1"
              >
                Enviar Cobrança
              </Button>
              <div className="flex items-center gap-1 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                  Pendente
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <WhatsappSendDialog
        isOpen={showWhatsappDialog}
        onClose={() => setShowWhatsappDialog(false)}
        onSend={handleSendPayment}
        report={report}
      />

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowPreview(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Preview do Laudo
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <h4 className="text-lg font-semibold mb-4">{report.title}</h4>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {report.body}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}