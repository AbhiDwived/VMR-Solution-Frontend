'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
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
  // Get new arrivals from real data (kitchen and bathroom items)
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
    <section className="bg-secondary/5 py-8 sm:py-12">
      <div className="w-full px-2 sm:px-4">
        <div className="mb-6 text-center sm:mb-8" data-aos="fade-up">
          <div className="mb-1 flex items-center justify-center space-x-2 sm:mb-2">
            <Icon name="SparklesIcon" size={24} className="text-secondary sm:size-8" variant="solid" />
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              New Arrivals
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">
            Fresh additions to our collection
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-6">
          {newProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/product-details?id=${product.id}`}
              className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
              data-aos="slide-up"
              data-aos-delay={index * 150}
            >
              <div className="absolute left-2 top-2 z-10 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground sm:px-3 sm:text-sm">
                NEW
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-6">
                <p className="caption mb-1 text-muted-foreground">{product.category}</p>
                <h3 className="mb-2 text-base font-medium text-card-foreground sm:text-lg">
                  {product.name}
                </h3>
                <div className="mb-2 flex items-center space-x-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm">
                  <Icon name="CalendarIcon" size={14} />
                  <span>Launched {product.launchDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary sm:text-xl">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="flex items-center space-x-1 text-xs font-medium text-secondary sm:text-sm">
                    <span>View Details</span>
                    <Icon name="ArrowRightIcon" size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;