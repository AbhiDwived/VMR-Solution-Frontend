'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ui/ProductCard';
import { useGetProductsQuery } from '@/store/api/productsApi';

interface FeaturedProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  alt: string;
  rating: number;
}

const FeaturedProducts = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { data: productsData, isLoading } = useGetProductsQuery({});

  // Get featured products from API data
  const featuredProducts: FeaturedProduct[] = productsData?.data?.slice(0, 36).map((product: any) => {
    let productImages = [];
    if (Array.isArray(product.product_images)) {
      productImages = product.product_images;
    } else if (typeof product.product_images === 'string') {
      try {
        productImages = JSON.parse(product.product_images || '[]');
      } catch (error) {
        console.warn('Failed to parse product images:', error);
        productImages = [];
      }
    }
    
    return {
      id: product.id.toString(),
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: Number(product.discount_price) || Number(product.price),
      originalPrice: Number(product.price),
      image: (() => {
        const images = productImages;
        if (images && images.length > 0) {
          const img = images[0];
          // Handle both relative and absolute paths
          if (img.startsWith('http')) {
            return img;
          } else if (img.startsWith('/assets/')) {
            return img; // Next.js will serve from public directory
          }
          return img;
        }
        return '/placeholder.jpg';
      })(),
      alt: product.description,
      rating: 4.5,
    };
  }) || [];

  if (isLoading) {
    return (
      <section className="w-full px-2 py-8 sm:px-4 sm:py-12">
        <div className="text-center">Loading products...</div>
      </section>
    );
  }

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
            Our Products
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

      <div className="relative" data-aos="fade-up">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-card p-2 shadow-elevation-3 transition-smooth hover:scale-110 lg:block"
          aria-label="Scroll left"
        >
          <Icon name="ChevronLeftIcon" size={20} />
        </button>

        <div
          id="featured-carousel"
          className="grid grid-cols-2 gap-1 sm:gap-2 lg:grid-cols-6"
        >
          {featuredProducts.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                category={product.category}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                alt={product.alt}
                rating={product.rating}
                discount={discount}
                showThumbnails={false}
                animationDelay={0}
              />
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



