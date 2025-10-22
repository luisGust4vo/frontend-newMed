'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Plus,
  Calendar,
  Crown,
  Zap,
  BarChart3
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

const navItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: 'Laudos',
    path: '/reports',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: 'Novo Laudo',
    path: '/reports/create',
    icon: <Plus className="w-5 h-5" />,
  },
  {
    name: 'Agenda',
    path: '/calendar',
    icon: <Calendar className="w-5 h-5" />,
    badge: 'Novo'
  },
  {
    name: 'Pacientes',
    path: '/patients',
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: 'Automação',
    path: '/automation',
    icon: <Zap className="w-5 h-5" />,
    badge: 'IA'
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    badge: 'Pro'
  },
  {
    name: 'Premium',
    path: '/subscription',
    icon: <Crown className="w-5 h-5" />,
    badge: 'Pro'
  },
  {
    name: 'Configurações',
    path: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

export function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? 'w-[290px]'
            : isHovered
            ? 'w-[290px]'
            : 'w-[90px]'
        }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
        }`}
      >
        <Link href="/dashboard">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {process.env.NEXT_PUBLIC_APP_NAME || 'LaudoPay'}
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                } ${
                  !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <div className="flex items-center justify-between flex-1 ml-3">
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        item.badge === 'Pro' 
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' 
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}