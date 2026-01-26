import type { Metadata } from 'next';
import DashboardInteractive from './dashboard-components/DashboardInteractive';
import AuthGuard from '@/features/auth/components/AuthGuard';

export const metadata: Metadata = {
  title: 'My Account - VMR Solution',
  description:
    'Manage your VMR Solution account, view order history, track deliveries, manage wishlist, update profile information, and access saved addresses in your personalized dashboard.',
};

export default function UserDashboardPage() {
  return (
    <AuthGuard
      requireAuth={true}
      requireVerification={false}
      allowedRoles={['retail', 'bulk', 'user']}
    >
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-full px-4 py-6 sm:px-6 md:px-8 md:py-8">
          <DashboardInteractive />
        </main>
      </div>
    </AuthGuard>
  );
}
