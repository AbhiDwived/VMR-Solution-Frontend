import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import AdminSidebar from '../components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Brands - Admin Dashboard',
  description: 'Manage product brands for VMR Solution.',
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <Breadcrumb />
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-espresso">Brands</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
              <p className="text-mocha-grey">Brand management content will be implemented here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}