import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'My Account - VMR Solution',
  description: 'Manage your VMR Solution account, view order history, track deliveries, manage wishlist, update profile information, and access saved addresses in your personalized dashboard.',
};

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 md:py-8">
        <Breadcrumb />
        <DashboardInteractive />
      </main>
    </div>
  );
}
