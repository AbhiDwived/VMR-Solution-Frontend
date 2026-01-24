'use client';

import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';

interface NewProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  launchDate: string;
}

const NewArrivals = () => {
  const newProducts: NewProduct[] = products
    .filter(p => ['Kitchen', 'Bathroom', 'Basins', 'Tubs'].includes(p.category))
    .slice(0, 6)
    .map(product => ({
      id: product.id.toString(),
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      alt: product.description,
      launchDate: 'Jan 2025',
    }));

  return (
    <section className="bg-background py-8 sm:py-12">
      <div className="w-full px-2 sm:px-4">
        <div className="mb-6 text-center sm:mb-8" data-aos="fade-up">
          <div className="mb-1 flex items-center justify-center space-x-2 sm:mb-2">
            <Icon name="SparklesIcon" size={24} className="text-primary sm:size-8" variant="solid" />
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              New Arrivals
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">
            Fresh additions to our collection
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1 sm:gap-2 lg:grid-cols-6">
          {newProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              alt={product.alt}
              rating={4.5}
              showThumbnails={false}
              animationDelay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;



