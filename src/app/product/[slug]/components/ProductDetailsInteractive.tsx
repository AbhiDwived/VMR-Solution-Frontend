'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetProductBySlugQuery } from '@/store/api/productsApi';
import ProductImageGallery from '../../../product-details/components/ProductImageGallery';
import ProductInfo from '../../../product-details/components/ProductInfo';
import ProductTabs from '../../../product-details/components/ProductTabs';
import BulkPricingCalculator from '../../../product-details/components/BulkPricingCalculator';
import RelatedProducts from '../../../product-details/components/RelatedProducts';

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
  const params = useParams();
  const slug = params.slug as string;
  const { data: productData, isLoading } = useGetProductBySlugQuery(slug);
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImages, setCurrentImages] = useState<ProductImage[]>([]);
  const [allVariantImages, setAllVariantImages] = useState<ProductImage[]>([]);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    setIsHydrated(true);
    if (slug && productData?.data) {
      const foundProduct = productData.data;
      if (foundProduct) {
        setProduct(foundProduct);
        let images = [];
        if (Array.isArray(foundProduct.product_images)) {
          images = foundProduct.product_images;
        } else if (typeof foundProduct.product_images === 'string') {
          try {
            images = JSON.parse(foundProduct.product_images);
          } catch (e) {
            console.warn('Failed to parse product images:', e);
            images = [];
          }
        }
        const productImages = images.map((url: string, index: number) => ({
          id: (index + 1).toString(),
          url,
          alt: foundProduct.description || foundProduct.name,
        }));
        setCurrentImages(productImages);

        // Create variants from database variants data
        let dbVariants = [];
        if (Array.isArray(foundProduct.variants)) {
          dbVariants = foundProduct.variants;
        } else if (typeof foundProduct.variants === 'string') {
          try {
            dbVariants = JSON.parse(foundProduct.variants);
          } catch (e) {
            console.warn('Failed to parse variants:', e);
            dbVariants = [];
          }
        }
        console.warn('📦 Database variants loaded:', dbVariants.length, 'variants');
        console.warn('📊 Database variants:', dbVariants);

        const variants = dbVariants.map((dbVariant: any) => ({
          id: dbVariant.variantId,
          size: dbVariant.size,
          color: dbVariant.color.name,
          colorHex: dbVariant.color.code,
          capacity: foundProduct.weight ? `${foundProduct.weight}kg` : 'N/A',
          price: dbVariant.price,
          originalPrice: Number(foundProduct.price),
          stock: dbVariant.stock,
          minOrderQty: 1,
        }));

        console.warn('🔄 Frontend variants created:', variants.length, 'variants');
        console.warn('📊 Frontend variants:', variants);

        setProductVariants(variants);
        if (variants.length > 0) {
          setSelectedVariant(variants[0]);
        } else {
          // Create a default variant if no variants exist
          const defaultVariant: ProductVariant = {
            id: 'default',
            size: foundProduct.sizes?.[0] || 'Standard',
            color: foundProduct.colors?.[0] || 'Default',
            colorHex: '#000000',
            capacity: foundProduct.weight ? `${foundProduct.weight}kg` : 'N/A',
            price: Number(foundProduct.discount_price || foundProduct.price),
            originalPrice: Number(foundProduct.price),
            stock: foundProduct.stock_quantity || 0,
            minOrderQty: 1,
          };
          setSelectedVariant(defaultVariant);
          setProductVariants([defaultVariant]);
        }
      }
    }
  }, [isHydrated, slug, productData]);



  const specifications: Specification[] = product ? [
    { label: 'Material', value: product.materials || 'N/A' },
    { label: 'Brand', value: product.brand || 'N/A' },
    { label: 'Weight', value: product.weight ? `${product.weight}kg` : 'N/A' },
    { label: 'Warranty', value: product.warranty || 'N/A' },
    { label: 'Category', value: product.category || 'N/A' },
    { label: 'Sizes', value: (() => {
      try {
        return JSON.parse(product.sizes || '[]').join(', ') || 'N/A';
      } catch (e) {
        return 'N/A';
      }
    })() },
    { label: 'Care Instructions', value: product.care_instructions || 'N/A' },
    { label: 'Additional Info', value: product.additional_info || 'N/A' },
    { label: 'Stock Quantity', value: product.stock_quantity?.toString() || 'N/A' },
  ] : [];

  const careInstructions: string[] = product ? [
    product.care_instructions || 'No care instructions available',
    product.additional_info || 'No additional information available',
  ].filter(Boolean) : [];

  const warrantyInfo = product?.warranty ? `This product comes with ${product.warranty} warranty. ${product.additional_info || ''}` : 'No warranty information available.';

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
      const firstVariant = productVariants[0];
      if (firstVariant) {
        setSelectedVariant(firstVariant);
      }

      // Get all variant images
      let dbVariants = [];
      if (Array.isArray(product?.variants)) {
        dbVariants = product.variants;
      } else if (typeof product?.variants === 'string') {
        try {
          dbVariants = JSON.parse(product.variants);
        } catch (e) {
          console.warn('Failed to parse variants for images:', e);
          dbVariants = [];
        }
      }
      const allImages: ProductImage[] = [];

      dbVariants.forEach((v: any, variantIndex: number) => {
        if (v.images && v.images.length > 0) {
          v.images.forEach((url: string, imageIndex: number) => {
            allImages.push({
              id: `variant-${variantIndex}-${imageIndex}`,
              url,
              alt: `${product?.name} - ${v.color?.name || 'Color'} ${v.size}`,
              colorVariant: v.color?.name || 'Default',
            });
          });
        }
      });

      if (allImages.length === 0) {
        let images = [];
        if (Array.isArray(product?.product_images)) {
          images = product.product_images;
        } else if (typeof product?.product_images === 'string') {
          try {
            images = JSON.parse(product.product_images);
          } catch (e) {
            console.warn('Failed to parse product images for fallback:', e);
            images = [];
          }
        }
        const defaultImages = images.map((url: string, index: number) => ({
          id: (index + 1).toString(),
          url,
          alt: product?.description || product?.name,
        }));
        setCurrentImages(defaultImages);
        setAllVariantImages(defaultImages);
      } else {
        if (allImages.length > 0) {
          setCurrentImages([allImages[0]!]);
        }
        setAllVariantImages(allImages);
      }
    }
  }, [isHydrated, productVariants, product]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);

    // Find variant-specific images from the product's variants data
    let productVariants = [];
    if (Array.isArray(product.variants)) {
      productVariants = product.variants;
    } else if (typeof product.variants === 'string') {
      try {
        productVariants = JSON.parse(product.variants);
      } catch (e) {
        console.warn('Failed to parse variants for variant change:', e);
        productVariants = [];
      }
    }
    const matchingVariant = productVariants.find((v: any) =>
      v.color?.code === variant.colorHex && v.size === variant.size
    );

    if (matchingVariant?.images?.length > 0) {
      // Use variant-specific images
      const variantImages = matchingVariant.images.map((url: string, index: number) => ({
        id: `variant-${index + 1}`,
        url,
        alt: `${product.name} - ${variant.color} ${variant.size}`,
        colorVariant: variant.color,
      }));
      setCurrentImages(variantImages);
    } else {
      // Fallback to default product images
      let images = [];
      if (Array.isArray(product.product_images)) {
        images = product.product_images;
      } else if (typeof product.product_images === 'string') {
        try {
          images = JSON.parse(product.product_images);
        } catch (e) {
          console.warn('Failed to parse product images for fallback:', e);
          images = [];
        }
      }
      const defaultImages = images.map((url: string, index: number) => ({
        id: (index + 1).toString(),
        url,
        alt: product.description || product.name,
      }));
      setCurrentImages(defaultImages);
    }
  };

  const handleAddToCart = (_quantity: number) => {
    if (!isHydrated) return;
    alert(`Added ${_quantity} items to cart!`);
  };

  const handleBuyNow = (_quantity: number) => {
    if (!isHydrated) return;
    router.push('/checkout-process');
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <div className="text-center">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

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
          allVariantImages={allVariantImages}
          productName="Premium Plastic Flower Pot"
        />
        <ProductInfo
          productName={product.name}
          category={product.category}
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