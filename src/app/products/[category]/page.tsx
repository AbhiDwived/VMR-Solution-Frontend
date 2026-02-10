import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductCatalogInteractive from '../components/ProductCatalogInteractive';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${categoryName} - VMR Solution`,
    description: `Browse our collection of ${categoryName.toLowerCase()} products`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
        <Breadcrumb />
        
        <div className="mb-8" data-aos="fade-up">
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {categoryName}
          </h1>
          <p className="text-muted-foreground">
            Explore our {categoryName.toLowerCase()} collection
          </p>
        </div>

        <div data-aos="fade-up">
          <ProductCatalogInteractive />
        </div>
      </main>
    </div>
  );
}
