'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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
  const products: TrendingProduct[] = [
    {
      id: '1',
      name: 'Stackable Storage Bins Set',
      category: 'Containers',
      price: 799,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg',
      alt: 'Stackable transparent storage bins with colorful lids',
      rating: 4.8,
      salesCount: 1250,
    },
    {
      id: '2',
      name: 'Designer Flower Pot Collection',
      category: 'Flower Pots',
      price: 449,
      originalPrice: 699,
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      alt: 'Modern designer flower pots in various colors',
      rating: 4.6,
      salesCount: 980,
    },
    {
      id: '3',
      name: 'Premium Insulated Mugs',
      category: 'Mugs',
      price: 349,
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
      alt: 'Insulated plastic mugs keeping beverages hot or cold',
      rating: 4.5,
      salesCount: 875,
    },
    {
      id: '4',
      name: 'Multi-Purpose Bucket Set',
      category: 'Buckets',
      price: 599,
      originalPrice: 899,
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg',
      alt: 'Set of three multi-purpose plastic buckets',
      rating: 4.7,
      salesCount: 756,
    },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center space-x-2">
            <Icon name="FireIcon" size={32} className="text-accent" variant="solid" />
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Trending Now
            </h2>
          </div>
          <p className="text-muted-foreground">
            Most popular products this month
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              href={`/product-details?id=${product.id}`}
              className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
            >
              <div className="absolute left-2 top-2 z-10 flex items-center space-x-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                <Icon name="FireIcon" size={12} variant="solid" />
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
              <div className="p-4">
                <p className="caption mb-1 text-muted-foreground">{product.category}</p>
                <h3 className="mb-2 line-clamp-2 text-base font-medium text-card-foreground">
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
                  <span className="caption text-muted-foreground">({product.rating})</span>
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
    </section>
  );
};

export default TrendingProducts;