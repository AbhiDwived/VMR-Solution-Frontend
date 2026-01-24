'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { products } from '@/data/products';

interface TrendingProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
  salesCount: number;
}

const TrendingProducts = () => {
  // Get trending products from real data (patlas and furniture)
  const trendingProducts: TrendingProduct[] = products
    .filter(p => ['Patlas', 'Furniture', 'Mugs', 'Planters'].includes(p.category))
    .slice(0, 6)
    .map((product, index) => ({
      id: product.id.toString(),
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.price > 50 ? Math.floor(product.price * 1.4) : undefined,
      image: product.image,
      alt: product.description,
      rating: 4.5,
      salesCount: 500 + (index * 100),
    }));

  return (
    <section className="w-full px-2 py-8 sm:px-4 sm:py-12">
      <div className="mb-6 flex items-center justify-between sm:mb-8" data-aos="fade-up">
        <div>
          <div className="mb-1 flex items-center space-x-2 sm:mb-2">
            <Icon name="FireIcon" size={24} className="text-accent sm:size-8" variant="solid" />
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Trending Now
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">
            Most popular products this month
          </p>
        </div>
        <Link
          href="/product-catalog"
          className="flex items-center space-x-1 text-xs font-medium text-primary transition-smooth hover:underline sm:text-sm"
        >
          <span>View All</span>
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-6">
        {trendingProducts.map((product, index) => {
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              href={`/product-details?id=${product.id}`}
              className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute left-2 top-2 z-10 flex items-center space-x-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                <Icon name="FireIcon" size={10} variant="solid" />
                <span>{product.salesCount} sold</span>
              </div>
              {discount > 0 && (
                <div className="absolute right-2 top-2 z-10 rounded-md bg-error px-2 py-1 text-xs font-medium text-error-foreground">
                  {discount}% OFF
                </div>
              )}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4">
                <p className="caption mb-1 text-muted-foreground">{product.category}</p>
                <h3 className="mb-2 line-clamp-2 text-sm font-medium text-card-foreground sm:text-base">
                  {product.name}
                </h3>
                <div className="mb-2 flex items-center space-x-1 sm:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={12}
                      variant={i < Math.floor(product.rating) ? 'solid' : 'outline'}
                      className={i < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground'}
                    />
                  ))}
                  <span className="caption text-muted-foreground">({product.rating.toFixed(1)})</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-base font-semibold text-primary sm:text-lg">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through sm:text-sm">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingProducts;