'use client';
import { redirect } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    redirect('/dashboard/admin-dashboard');
  } else {
    redirect('/dashboard/user-dashboard');
  }
}
