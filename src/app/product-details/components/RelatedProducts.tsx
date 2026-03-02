'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useGetRelatedProductsQuery } from '@/store/api/productsApi';

interface RelatedProductsProps {
  slug: string;
}

const RelatedProducts = ({ slug }: RelatedProductsProps) => {
  const { data, isLoading } = useGetRelatedProductsQuery(slug);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!data?.data || data.data.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Related Products
        </h2>
        <Link
          href="/products"
          className="flex items-center space-x-1 text-sm font-medium text-primary transition-smooth hover:underline"
        >
          <span>View All</span>
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.data.map((product: any) => {
          const discountPercentage = product.price && product.discount_price
            ? Math.round(((product.price - product.discount_price) / product.price) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group rounded-lg border border-border bg-card transition-smooth hover:shadow-elevation-2"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                <AppImage
                  src={product.product_images?.[0] || ''}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {discountPercentage > 0 && (
                  <div className="absolute right-2 top-2 rounded-md bg-error px-2 py-1 text-xs font-medium text-error-foreground">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="caption mb-1 text-muted-foreground">{product.category}</p>
                <h3 className="mb-2 line-clamp-2 text-sm font-medium text-card-foreground">
                  {product.name}
                </h3>

                <div className="flex items-baseline space-x-2">
                  <span className="data-text font-bold text-primary">
                    ₹{Number(product.discount_price || product.price).toLocaleString('en-IN')}
                  </span>
                  {product.price && product.discount_price && product.price !== product.discount_price && (
                    <span className="caption text-muted-foreground line-through">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;



