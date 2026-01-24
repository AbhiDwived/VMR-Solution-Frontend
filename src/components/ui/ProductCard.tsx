'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
  discount?: number;
  showThumbnails?: boolean;
  animationDelay?: number;
}

const ProductCard = ({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  alt,
  rating,
  discount = 0,
  showThumbnails = true,
  animationDelay = 0
}: ProductCardProps) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Top Left: Discount */}
      {discount > 0 && (
        <span className="absolute left-3 top-3 z-20 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
          {discount}% OFF
        </span>
      )}

      {/* Top Right: Wishlist + Cart */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow transition hover:bg-gray-100"
        >
          <Icon name="HeartIcon" size={14} className="text-orange-500" />
        </button>

        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow transition hover:bg-gray-100"
        >
          <Icon name="ShoppingCartIcon" size={14} className="text-slate-700" />
        </button>
      </div>

      {/* Image - Full width */}
      <Link href={`/product-details?id=${id}`}>
        <div className="relative h-40 w-full overflow-hidden rounded-t-xl sm:h-44">
          <AppImage
            src={image}
            alt={alt}
            className="h-full w-full rounded-t-xl object-contain transition-transform duration-300 group-hover:scale-102"
          />
        </div>
      </Link>

      {/* Content with padding */}
      <div className="p-3">
        {/* Thumbnails (compact) */}
        {showThumbnails && (
          <div className="mb-2 flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-md border border-orange-400 bg-gray-200" />
            <div className="h-6 w-6 rounded-md bg-gray-200" />
            <span className="text-[11px] font-medium text-orange-500">+2</span>
          </div>
        )}

        {/* Product Info */}
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {category}
        </p>

        <h3 className="mb-1 line-clamp-2 text-sm font-medium text-foreground">
          {name}
        </h3>

        {/* Rating */}
        <div className="mb-1 flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="StarIcon"
              size={12}
              variant={i < Math.floor(rating) ? 'solid' : 'outline'}
              className={i < Math.floor(rating) ? 'text-accent' : 'text-muted-foreground'}
            />
          ))}
          <span className="text-[11px] text-muted-foreground">
            ({rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="mb-3 flex items-baseline space-x-2">
          <span className="text-base font-semibold text-primary">
            ₹{price.toLocaleString('en-IN')}
          </span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-2">
          {/* Bulk Orders */}
          <Link
            href={`/bulk-enquiry?product=${id}`}
            className="flex-1 rounded-lg border border-slate-900 py-1.5 text-center text-xs font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
          >
            BULK ORDERS
          </Link>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/919810092418?text=Hi%2C%20I%20am%20interested%20in%20bulk%20inquiry%20for%3A%0A%0AProduct%3A%20${encodeURIComponent(name)}%0ACategory%3A%20${encodeURIComponent(category)}%0APrice%3A%20%E2%82%B9${price.toLocaleString('en-IN')}%0A%0APlease%20share%20bulk%20pricing%20and%20availability.%0A%0AThank%20you%21`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 transition hover:bg-green-600"
          >
            <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={16} className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;



