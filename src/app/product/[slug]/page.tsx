import type { Metadata } from 'next';
import { Suspense } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductDetailsInteractive from './components/ProductDetailsInteractive';

export const metadata: Metadata = {
  title: 'Product Details - VMR Solution',
  description: 'High-quality plastic products with detailed specifications, pricing, and bulk ordering options.',
};

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-full px-4 py-8 sm:px-6">
        <Breadcrumb />
        <Suspense fallback={<div className="text-center py-8">Loading product details...</div>}>
          <ProductDetailsInteractive />
        </Suspense>
      </main>
    </div>
  );
}