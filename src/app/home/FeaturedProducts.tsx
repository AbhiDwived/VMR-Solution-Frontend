'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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

  const products: FeaturedProduct[] = [
    {
      id: '1',
      name: 'Premium Ceramic Flower Pot with Drainage',
      category: 'Flower Pots',
      price: 299,
      originalPrice: 499,
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      alt: 'White ceramic flower pot with green succulent plant',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Colorful Plastic Mugs Set of 6',
      category: 'Mugs',
      price: 199,
      originalPrice: 299,
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
      alt: 'Set of six colorful plastic mugs in various colors',
      rating: 4.2,
    },
    {
      id: '3',
      name: 'Airtight Food Storage Container Set',
      category: 'Containers',
      price: 599,
      originalPrice: 899,
      image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg',
      alt: 'Stack of transparent plastic food storage containers',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Heavy Duty Plastic Bucket 20L',
      category: 'Buckets',
      price: 249,
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg',
      alt: 'Blue plastic bucket with metal handle',
      rating: 4.4,
    },
    {
      id: '5',
      name: 'Modern Pedal Dustbin with Lid',
      category: 'Dustbins',
      price: 449,
      originalPrice: 699,
      image: 'https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg',
      alt: 'Stainless steel pedal dustbin with black lid',
      rating: 4.6,
    },
  ];

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
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-2 text-muted-foreground">
            Handpicked items just for you
          </p>
        </div>
        <Link
          href="/product-catalog"
          className="flex items-center space-x-1 text-sm font-medium text-primary transition-smooth hover:underline"
        >
          <span>View All</span>
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-card p-3 shadow-elevation-3 transition-smooth hover:scale-110 md:block"
          aria-label="Scroll left"
        >
          <Icon name="ChevronLeftIcon" size={24} />
        </button>

        <div
          id="featured-carousel"
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        >
          {products.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Link
                key={product.id}
                href={`/product-details?id=${product.id}`}
                className="group min-w-[280px] flex-shrink-0 rounded-lg border border-border bg-card shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
              >
                <div className="relative overflow-hidden rounded-t-lg bg-muted" style={{height: '200px'}}>
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
                <div className="p-4">
                  <p className="caption mb-1 text-muted-foreground">{product.category}</p>
                  <h3 className="mb-2 text-base font-medium text-card-foreground" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                    {product.name}
                  </h3>
                  <div className="mb-3 flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="StarIcon"
                        size={14}
                        variant={i < Math.floor(product.rating) ? 'solid' : 'outline'}
                        className={i < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-semibold text-primary">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
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
          className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-card p-3 shadow-elevation-3 transition-smooth hover:scale-110 md:block"
          aria-label="Scroll right"
        >
          <Icon name="ChevronRightIcon" size={24} />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;