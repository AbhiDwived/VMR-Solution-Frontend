import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import AdminSidebar from '../components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Products - Admin Dashboard',
  description: 'Manage all products in the VMR Solution catalog.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <Breadcrumb />
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-espresso">Products</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
              <p className="text-mocha-grey">Product management content will be implemented here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}