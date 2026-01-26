import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import AdminDashboardView from './components/AdminDashboardView';
import AdminSidebar from './components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard - VMR Solution',
  description: 'VMR Solution admin dashboard for managing products, orders, users, and business analytics.',
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <Breadcrumb />
          <AdminDashboardView />
        </div>
      </main>
    </div>
  );
}