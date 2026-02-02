'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ui/ProductCard';
import { useGetProductsQuery } from '@/store/api/productsApi';

interface TrendingProduct {
  id: string;
  slug: string;
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
  const { data: productsData, isLoading } = useGetProductsQuery({});

  // Get trending products from API data (patlas and furniture)
  const trendingProducts: TrendingProduct[] = productsData?.data
    ?.filter((p: any) => ['Patlas', 'Furniture', 'Mugs', 'Planters'].includes(p.category))
    .slice(0, 6)
    .map((product: any, index: number) => {
      let productImages = [];
      if (Array.isArray(product.product_images)) {
        productImages = product.product_images;
      } else if (typeof product.product_images === 'string') {
        try {
          productImages = JSON.parse(product.product_images || '[]');
        } catch (error) {
          productImages = [];
        }
      }
      
      return {
        id: product.id.toString(),
        slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name: product.name,
        category: product.category,
        price: Number(product.discount_price) || Number(product.price),
        originalPrice: Number(product.price) > 50 ? Math.floor(Number(product.price) * 1.4) : 0,
        image: (() => {
          const images = productImages;
          if (images && images.length > 0) {
            const img = images[0];
            if (img.startsWith('http')) {
              return img;
            } else if (img.startsWith('/assets/')) {
              return img;
            }
            return img;
          }
          return '/placeholder.jpg';
        })(),
        alt: product.description,
        rating: 4.5,
        salesCount: 500 + (index * 100),
      };
    }) || [];

  if (isLoading) {
    return (
      <section className="w-full px-2 py-8 sm:px-4 sm:py-12">
        <div className="text-center">Loading trending products...</div>
      </section>
    );
  }

  if (!trendingProducts.length) {
    return null;
  }

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
              slug={product.slug}
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice || 0}
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



