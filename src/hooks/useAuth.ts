'use client';

import { useState, useEffect } from 'react';
import { Professional } from '@/lib/types';
import { login } from '@/lib/api';
import { getStoredUser, clearAuth } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await login(email, password);
    localStorage.setItem('token', res.token);
    localStorage.setItem('professional', JSON.stringify(res.professional));
    setUser(res.professional);
    return res;
  };

  const signOut = () => {
    clearAuth();
    setUser(null);
    window.location.href = '/login';
  };

  return { 
    user, 
    signIn, 
    signOut, 
    isAuthenticated: !!user,
    loading 
  };
}