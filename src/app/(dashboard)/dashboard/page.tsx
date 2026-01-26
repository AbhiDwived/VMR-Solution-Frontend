'use client';
import { redirect } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    redirect('/admin-dashboard');
  } else {
    redirect('/user-dashboard');
  }
}
