import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata: Metadata = {
  title: 'Shopping Cart - VMR Solution',
  description: 'Review your selected plastic household products, modify quantities, apply promo codes, and proceed to secure checkout with GST-compliant pricing and free delivery on orders above ₹1000.',
};

export default function ShoppingCartPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
        <Breadcrumb />
        <ShoppingCartInteractive />
      </div>
    </main>
  );
}
