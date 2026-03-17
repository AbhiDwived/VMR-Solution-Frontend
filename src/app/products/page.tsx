import type { Metadata } from 'next';
import { Suspense } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductCatalogInteractive from './components/ProductCatalogInteractive';

export const metadata: Metadata = {
  title: 'Product Catalog - VMR Solution',
  description: 'Browse our extensive collection of high-quality plastic household products including flower pots, mugs, containers, buckets, and dustbins with multiple size and color options.',
};

export default function ProductCatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1600px] px-4 py-2 sm:px-6">
        <Breadcrumb />
        
        <div className="mb-4" data-aos="fade-up">
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Product Catalog
          </h1>
          <p className="text-muted-foreground">
            Discover our wide range of durable plastic products for your home and business
          </p>
        </div>

        <div data-aos="fade-up">
          <Suspense fallback={
            <div className="grid grid-cols-2 gap-1 sm:gap-2 lg:grid-cols-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          }>
            <ProductCatalogInteractive />
          </Suspense>
        </div>
      </main>
    </div>
  );
}



