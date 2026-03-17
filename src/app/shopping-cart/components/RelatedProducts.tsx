'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ui/ProductCard';

interface RelatedProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  packingStandard?: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          You May Also Like
        </h2>
        <Link
          href="/products"
          className="flex items-center gap-1 text-sm font-medium text-primary transition-smooth hover:underline"
        >
          View All
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            name={product.name}
            category={product.category}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            image={product.image}
            alt={product.alt}
            rating={product.rating}
            showThumbnails={false}
            animationDelay={index * 100}
            packingStandard={product.packingStandard}
          />
        ))}
      </div>
    </div>
  );
}
