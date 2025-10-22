'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Sparkles,
  Calendar,
  Activity,
  Stethoscope,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { getDashboardStats } from '@/lib/api';
import { DashboardStats } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend,
  color = 'blue',
  subtitle
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  trend?: string;
  color?: string;
  subtitle?: string;
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-500 to-orange-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-indigo-500',
    pink: 'from-pink-500 to-rose-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} shadow-lg`}>
          <div className="text-white">{icon}</div>
        </div>
        {trend && (
          <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  href, 
  color = 'blue',
  badge
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
  badge?: string;
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    purple: 'from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600',
    pink: 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
  };

  return (
    <Link href={href}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 from-blue-500 to-purple-600"></div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-white">{icon}</div>
            </div>
            {badge && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                {badge}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';

  if (loading) {
    return (
      <ProtectedShell>
        <div className="animate-pulse space-y-8">
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
            ))}
          </div>
        </div>
      </ProtectedShell>
    );
  }

  return (
    <ProtectedShell>
      <div className="space-y-8">
        {/* Header com saudação */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {greeting}, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Aqui está um resumo da sua prática médica hoje
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Calendar className="w-8 h-8 text-white" />
                <p className="text-sm text-blue-100 mt-2">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total de Laudos"
            value={stats?.totalReports || 0}
            icon={<FileText className="w-6 h-6" />}
            color="blue"
            trend="+12%"
            subtitle="Este mês"
          />
          <StatCard
            title="Aguardando Pagamento"
            value={stats?.pendingPayments || 0}
            icon={<Clock className="w-6 h-6" />}
            color="yellow"
            subtitle="Pendentes"
          />
          <StatCard
            title="Receita Total"
            value={`R$ ${(stats?.totalRevenue || 0).toFixed(2)}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
            trend="+8%"
            subtitle="Este mês"
          />
          <StatCard
            title="Laudos Prontos"
            value={stats?.readyReports || 0}
            icon={<CheckCircle className="w-6 h-6" />}
            color="purple"
            subtitle="Disponíveis"
          />
        </div>

        {/* Ações rápidas */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ações Rápidas
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard
              title="Novo Laudo Médico"
              description="Crie laudos com templates profissionais para exames, consultas e procedimentos médicos"
              icon={<Stethoscope className="w-6 h-6" />}
              href="/reports/create"
              color="blue"
              badge="Popular"
            />
            
            <QuickActionCard
              title="Laudo Odontológico"
              description="Templates especializados para exames odontológicos, radiografias e avaliações ortodonticas"
              icon={<Heart className="w-6 h-6" />}
              href="/reports/create"
              color="green"
              badge="Novo"
            />
            
            <QuickActionCard
              title="Gerenciar Pacientes"
              description="Cadastre novos pacientes e gerencie informações de contato e histórico"
              icon={<Users className="w-6 h-6" />}
              href="/patients"
              color="purple"
            />
            
            <QuickActionCard
              title="Meus Laudos"
              description="Visualize todos os laudos criados, gerencie pagamentos e faça downloads"
              icon={<FileText className="w-6 h-6" />}
              href="/reports"
              color="pink"
            />
            
            <QuickActionCard
              title="Agenda Inteligente"
              description="Calendário com agendamento automático via WhatsApp e lembretes"
              icon={<Calendar className="w-6 h-6" />}
              href="/calendar"
              color="blue"
              badge="Novo"
            />
            
            <QuickActionCard
              title="Automação Inteligente"
              description="Workflows que executam tarefas repetitivas automaticamente"
              icon={<Activity className="w-6 h-6" />}
              href="/automation"
              color="purple"
              badge="IA"
            />
            
            <QuickActionCard
              title="IA para Laudos"
              description="Análise automática com inteligência artificial para diagnósticos precisos"
              icon={<Activity className="w-6 h-6" />}
              href="/reports/create"
              color="purple"
              badge="IA"
            />
            
            <QuickActionCard
              title="Planos Premium"
              description="Desbloqueie recursos avançados, IA ilimitada e integrações exclusivas"
              icon={<CheckCircle className="w-6 h-6" />}
              href="/subscription"
              color="pink"
              badge="Pro"
            />
          </div>
        </div>
      </div>
    </ProtectedShell>
  );
}