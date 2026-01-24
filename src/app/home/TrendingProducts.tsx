'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ui/ProductCard';
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

      <div className="grid grid-cols-2 gap-1 sm:gap-2 lg:grid-cols-6">
        {trendingProducts.map((product, index) => {
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              alt={product.alt}
              rating={product.rating}
              discount={discount}
              animationDelay={index * 100}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TrendingProducts;



