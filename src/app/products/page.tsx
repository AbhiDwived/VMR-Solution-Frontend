import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductCatalogInteractive from './components/ProductCatalogInteractive';

export const metadata: Metadata = {
  title: 'Product Catalog - VMR Solution',
  description: 'Browse our extensive collection of high-quality plastic household products including flower pots, mugs, containers, buckets, and dustbins with multiple size and color options.',
};

export default function ProductCatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
        <Breadcrumb />
        
        <div className="mb-8" data-aos="fade-up">
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Product Catalog
          </h1>
          <p className="text-muted-foreground">
            Discover our wide range of durable plastic products for your home and business
          </p>
        </div>

        <div data-aos="fade-up">
          <ProductCatalogInteractive />
        </div>
      </main>
    </div>
  );
}



