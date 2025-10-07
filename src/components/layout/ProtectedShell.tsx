'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/Toast';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';

interface ProtectedShellProps {
  children: React.ReactNode;
}

export function ProtectedShell({ children }: ProtectedShellProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppSidebar />
      <div className="lg:pl-64">
        <AppTopbar />
        <main className="p-6">
          {children}
        </main>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}