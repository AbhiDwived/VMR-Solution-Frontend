'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { products } from '@/data/products';

interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
}

const FeaturedProducts = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Get featured products from real data
  const featuredProducts: FeaturedProduct[] = products.slice(0, 12).map(product => ({
    id: product.id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: product.price > 100 ? Math.floor(product.price * 1.3) : undefined,
    image: product.image,
    alt: product.description,
    rating: 4.5,
  }));

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('featured-carousel');
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="w-full px-2 py-8 sm:px-4 sm:py-12">
      <div className="mb-6 flex items-center justify-between sm:mb-8" data-aos="fade-up">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Featured Products
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:mt-2 sm:text-base">
            Handpicked items just for you
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

      <div className="relative" data-aos="fade-up" data-aos-delay="200">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-card p-2 shadow-elevation-3 transition-smooth hover:scale-110 lg:block"
          aria-label="Scroll left"
        >
          <Icon name="ChevronLeftIcon" size={20} />
        </button>

        <div
          id="featured-carousel"
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6 lg:gap-6"
        >
          {featuredProducts.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Link
                key={product.id}
                href={`/product-details?id=${product.id}`}
                className="group flex-shrink-0 rounded-lg border border-border bg-card shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
              >
                <div className="relative overflow-hidden rounded-t-lg bg-muted h-[150px] sm:h-[180px] lg:h-[200px]">
                  <AppImage
                    src={product.image}
                    alt={product.alt}
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  {discount > 0 && (
                    <div className="absolute right-2 top-2 rounded-md bg-error px-2 py-1 text-xs font-medium text-error-foreground">
                      {discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <p className="caption mb-1 text-muted-foreground">{product.category}</p>
                  <h3 className="mb-2 text-sm font-medium text-card-foreground line-clamp-2 sm:text-base">
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

        <button
          onClick={() => scroll('right')}
          className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-card p-2 shadow-elevation-3 transition-smooth hover:scale-110 lg:block"
          aria-label="Scroll right"
        >
          <Icon name="ChevronRightIcon" size={20} />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;