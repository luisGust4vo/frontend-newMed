import { Professional } from './types';

export const getStoredUser = (): Professional | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('professional');
  return raw ? JSON.parse(raw) : null;
};

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const clearAuth = () => {
  if (typeof window === 'undefined') return;
  localStorage.clear();
};