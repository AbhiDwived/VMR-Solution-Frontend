'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import BulkPricingCalculator from './BulkPricingCalculator';
import RelatedProducts from './RelatedProducts';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  colorVariant?: string;
}

interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  capacity: string;
  price: number;
  originalPrice?: number;
  stock: number;
  minOrderQty: number;
}

interface Specification {
  label: string;
  value: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface RelatedProduct {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
}

interface PricingTier {
  minQty: number;
  maxQty: number | null;
  pricePerUnit: number;
  discount: number;
}

const ProductDetailsInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImages, setCurrentImages] = useState<ProductImage[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const productImages: ProductImage[] = [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/6069093/pexels-photo-6069093.jpeg',
      alt: 'Large terracotta colored plastic flower pot with drainage holes on white background',
      colorVariant: 'Terracotta',
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/7656746/pexels-photo-7656746.jpeg',
      alt: 'Close-up view of plastic flower pot showing textured surface and rim detail',
      colorVariant: 'Terracotta',
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/6069094/pexels-photo-6069094.jpeg',
      alt: 'Side angle of plastic flower pot displaying depth and drainage system',
      colorVariant: 'Terracotta',
    },
    {
      id: '4',
      url: 'https://images.pexels.com/photos/7656747/pexels-photo-7656747.jpeg',
      alt: 'Bottom view of plastic flower pot showing drainage holes pattern',
      colorVariant: 'Terracotta',
    },
  ];

  const productVariants: ProductVariant[] = [
    {
      id: 'v1',
      size: 'Small',
      color: 'Terracotta',
      colorHex: '#C4621A',
      capacity: '1.5 Liters',
      price: 149,
      originalPrice: 199,
      stock: 150,
      minOrderQty: 10,
    },
    {
      id: 'v2',
      size: 'Medium',
      color: 'Terracotta',
      colorHex: '#C4621A',
      capacity: '3 Liters',
      price: 249,
      originalPrice: 299,
      stock: 120,
      minOrderQty: 10,
    },
    {
      id: 'v3',
      size: 'Large',
      color: 'Terracotta',
      colorHex: '#C4621A',
      capacity: '5 Liters',
      price: 349,
      originalPrice: 449,
      stock: 80,
      minOrderQty: 5,
    },
    {
      id: 'v4',
      size: 'Small',
      color: 'Forest Green',
      colorHex: '#2D5A3D',
      capacity: '1.5 Liters',
      price: 149,
      originalPrice: 199,
      stock: 100,
      minOrderQty: 10,
    },
    {
      id: 'v5',
      size: 'Medium',
      color: 'Forest Green',
      colorHex: '#2D5A3D',
      capacity: '3 Liters',
      price: 249,
      originalPrice: 299,
      stock: 90,
      minOrderQty: 10,
    },
    {
      id: 'v6',
      size: 'Large',
      color: 'Forest Green',
      colorHex: '#2D5A3D',
      capacity: '5 Liters',
      price: 349,
      originalPrice: 449,
      stock: 60,
      minOrderQty: 5,
    },
    {
      id: 'v7',
      size: 'Small',
      color: 'Cream White',
      colorHex: '#FAFAF9',
      capacity: '1.5 Liters',
      price: 149,
      originalPrice: 199,
      stock: 130,
      minOrderQty: 10,
    },
    {
      id: 'v8',
      size: 'Medium',
      color: 'Cream White',
      colorHex: '#FAFAF9',
      capacity: '3 Liters',
      price: 249,
      originalPrice: 299,
      stock: 110,
      minOrderQty: 10,
    },
    {
      id: 'v9',
      size: 'Large',
      color: 'Cream White',
      colorHex: '#FAFAF9',
      capacity: '5 Liters',
      price: 349,
      originalPrice: 449,
      stock: 70,
      minOrderQty: 5,
    },
  ];

  const specifications: Specification[] = [
    { label: 'Material', value: 'High-Grade Virgin Plastic' },
    { label: 'Finish', value: 'Matte with UV Protection' },
    { label: 'Weight (Empty)', value: '250g - 800g (varies by size)' },
    { label: 'Drainage', value: 'Multiple Bottom Holes' },
    { label: 'UV Resistant', value: 'Yes' },
    { label: 'Temperature Range', value: '-20°C to 60°C' },
    { label: 'Suitable For', value: 'Indoor & Outdoor Use' },
    { label: 'Eco-Friendly', value: '100% Recyclable' },
    { label: 'Made In', value: 'India' },
    { label: 'Certification', value: 'ISI Certified' },
  ];

  const careInstructions: string[] = [
    'Clean with mild soap and water regularly to maintain appearance',
    'Avoid using harsh chemicals or abrasive cleaners that may damage the surface',
    'Ensure proper drainage to prevent water accumulation and root rot',
    'Store indoors during extreme weather conditions to extend product life',
    'Do not expose to direct flame or heat sources above 60°C',
    'Check drainage holes periodically and clear any blockages',
    'For outdoor use, place on stable surface to prevent tipping',
    'Rinse thoroughly before first use to remove any manufacturing residue',
  ];

  const warrantyInfo = `This product comes with a 12-month manufacturer warranty against manufacturing defects. The warranty covers cracks, color fading, and structural damage under normal usage conditions. Warranty does not cover damage from misuse, accidents, exposure to extreme temperatures beyond specified range, or natural wear and tear. To claim warranty, please retain your purchase invoice and contact our customer support within the warranty period. Free replacement will be provided for valid warranty claims within 7-10 business days.`;

  const reviews: Review[] = [
    {
      id: 'r1',
      userName: 'Priya Sharma',
      rating: 5,
      date: '15 January 2026',
      comment: `Excellent quality flower pots! I ordered the medium size in terracotta color for my balcony garden. The material is sturdy and the drainage system works perfectly. Plants are thriving and the pots look beautiful. Great value for money and fast delivery. Highly recommend for both indoor and outdoor use.`,
      verified: true,
    },
    {
      id: 'r2',
      userName: 'Rajesh Kumar',
      rating: 4,
      date: '10 January 2026',
      comment: `Good product overall. Bought 20 pieces for my nursery business. The bulk pricing made it very affordable. Quality is consistent across all units. Only minor issue is that the color is slightly lighter than shown in pictures, but still looks good. Would definitely order again.`,
      verified: true,
    },
    {
      id: 'r3',
      userName: 'Anita Desai',
      rating: 5,
      date: '05 January 2026',
      comment: `Perfect for my herb garden! The small size is ideal for kitchen herbs. Love that they are UV resistant and can be used outdoors. The drainage holes are well-designed and prevent waterlogging. Very happy with this purchase and the quick delivery to Bangalore.`,
      verified: true,
    },
    {
      id: 'r4',
      userName: 'Vikram Singh',
      rating: 5,
      date: '28 December 2025',
      comment: `Outstanding quality and durability. I've been using these pots for 6 months now and they still look brand new. No fading, no cracks despite being in direct sunlight. The forest green color is beautiful and complements my garden perfectly. Best plastic pots I've purchased.`,
      verified: true,
    },
  ];

  const relatedProducts: RelatedProduct[] = [
    {
      id: 'rp1',
      name: 'Premium Plastic Watering Can - 5 Liter Capacity',
      image: 'https://images.pexels.com/photos/6231818/pexels-photo-6231818.jpeg',
      alt: 'Green plastic watering can with long spout and comfortable handle on garden background',
      price: 299,
      originalPrice: 399,
      rating: 4.6,
      category: 'Gardening Tools',
    },
    {
      id: 'rp2',
      name: 'Plastic Plant Saucer Set - Pack of 5',
      image: 'https://images.pexels.com/photos/7656748/pexels-photo-7656748.jpeg',
      alt: 'Stack of round terracotta colored plastic plant saucers in various sizes',
      price: 199,
      originalPrice: 249,
      rating: 4.4,
      category: 'Gardening Accessories',
    },
    {
      id: 'rp3',
      name: 'Hanging Plastic Planter with Chain - Set of 3',
      image: 'https://images.pexels.com/photos/6231819/pexels-photo-6231819.jpeg',
      alt: 'White hanging plastic planters with metal chains displaying flowering plants',
      price: 449,
      originalPrice: 599,
      rating: 4.7,
      category: 'Hanging Planters',
    },
    {
      id: 'rp4',
      name: 'Rectangular Plastic Planter Box - Large',
      image: 'https://images.pexels.com/photos/7656749/pexels-photo-7656749.jpeg',
      alt: 'Long rectangular brown plastic planter box with drainage holes for balcony gardening',
      price: 549,
      originalPrice: 699,
      rating: 4.5,
      category: 'Planters',
    },
  ];

  const pricingTiers: PricingTier[] = [
    { minQty: 10, maxQty: 49, pricePerUnit: 249, discount: 0 },
    { minQty: 50, maxQty: 99, pricePerUnit: 229, discount: 8 },
    { minQty: 100, maxQty: 249, pricePerUnit: 209, discount: 16 },
    { minQty: 250, maxQty: null, pricePerUnit: 189, discount: 24 },
  ];

  useEffect(() => {
    if (isHydrated && productVariants.length > 0) {
      setSelectedVariant(productVariants[0]);
      setCurrentImages(productImages);
    }
  }, [isHydrated]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    const variantImages = productImages.filter(
      (img) => !img.colorVariant || img.colorVariant === variant.color
    );
    setCurrentImages(variantImages.length > 0 ? variantImages : productImages);
  };

  const handleAddToCart = (quantity: number) => {
    if (!isHydrated) return;
    alert(`Added ${quantity} items to cart!`);
  };

  const handleBuyNow = (quantity: number) => {
    if (!isHydrated) return;
    router.push('/checkout-process');
  };

  if (!isHydrated || !selectedVariant) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-lg bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-12 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Main Product Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductImageGallery
          images={currentImages}
          productName="Premium Plastic Flower Pot"
        />
        <ProductInfo
          productName="Premium Plastic Flower Pot - Durable Garden Planter"
          category="Plastic Gamla / Flower Pots"
          rating={4.7}
          reviewCount={1247}
          variants={productVariants}
          onVariantChange={handleVariantChange}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </div>

      {/* Bulk Pricing Calculator */}
      <BulkPricingCalculator
        pricingTiers={pricingTiers}
        basePrice={selectedVariant.price}
      />

      {/* Product Details Tabs */}
      <ProductTabs
        specifications={specifications}
        careInstructions={careInstructions}
        warrantyInfo={warrantyInfo}
        reviews={reviews}
        relatedProducts={relatedProducts}
      />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetailsInteractive;
