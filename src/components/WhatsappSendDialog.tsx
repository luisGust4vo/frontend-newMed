'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { Report } from '@/lib/types';

interface WhatsappSendDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (phone: string) => Promise<void>;
  report: Report;
}

export function WhatsappSendDialog({ isOpen, onClose, onSend, report }: WhatsappSendDialogProps) {
  const [phone, setPhone] = useState(report.patient?.phone || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!phone.trim()) return;
    
    setLoading(true);
    try {
      await onSend(phone);
      onClose();
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <MessageCircle className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Enviar Cobrança
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Laudo: <span className="font-medium">{report.title}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Valor: <span className="font-medium">R$ {report.price.toFixed(2)}</span>
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Número do WhatsApp
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+5511999999999"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Formato: +55 + DDD + número (ex: +5511999999999)
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            className="flex-1"
            disabled={loading || !phone.trim()}
            startIcon={loading ? undefined : <MessageCircle className="w-4 h-4" />}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </div>
      </div>
    </div>
  );
}