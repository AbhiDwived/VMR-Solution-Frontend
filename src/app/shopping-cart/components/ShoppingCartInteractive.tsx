'use client';

import { useState, useEffect, useRef } from 'react';
import { useGetCartQuery, useUpdateCartMutation, useRemoveFromCartMutation } from '@/store/api/cartApi';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import RelatedProducts from './RelatedProducts';
import EmptyCart from './EmptyCart';
import ClearCartModal from './ClearCartModal';
import Icon from '@/components/ui/AppIcon';
import { useGetProductsQuery } from '@/store/api/productsApi';

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

interface RecentProduct {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
}

interface ShoppingCartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant: string;
  packingStandard?: string;
}

export default function ShoppingCartInteractive() {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const { data: productsData } = useGetProductsQuery({});
  const [updateCartApi] = useUpdateCartMutation();
  const [removeFromCartApi] = useRemoveFromCartMutation();
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const apiProducts = productsData?.data || [];

  const rawCartItems = cartData?.data || [];
  const cartItems: ShoppingCartItem[] = rawCartItems.map((item: any): ShoppingCartItem => {
    let images = [];
    try {
      images = typeof item.product_images === 'string' ? JSON.parse(item.product_images) : item.product_images;
    } catch (e) {
      images = [];
    }
    return {
      id: item.id.toString(),
      name: item.name,
      price: item.discount_price || item.price,
      image: Array.isArray(images) ? images[0] || '' : '',
      quantity: item.quantity,
      variant: item.variant_id,
      packingStandard: item.packing_standard || undefined,
    };
  });

  const relatedProducts: RelatedProduct[] = apiProducts
    .slice(0, 8)
    .map((product: any) => {
      let images: string[] = [];
      try {
        images = typeof product.product_images === 'string' ? JSON.parse(product.product_images) : (product.product_images || []);
      } catch { images = []; }
      const discountPrice = Number(product.discount_price);
      const originalPrice = Number(product.price);
      const price = discountPrice && discountPrice < originalPrice ? discountPrice : originalPrice;
      const discount = discountPrice && discountPrice < originalPrice ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;
      return {
        id: product.id.toString(),
        slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name: product.name,
        category: product.category || '',
        image: Array.isArray(images) ? images[0] || '' : '',
        alt: product.description || product.name,
        price,
        originalPrice,
        discount,
        rating: 4.5,
        packingStandard: product.packing_standard || undefined,
      };
    });

  const recentProducts: RecentProduct[] = apiProducts
    .slice(0, 2)
    .map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      image: '/placeholder.jpg',
      alt: product.description,
      price: Number(product.price),
    }));

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    updateTimeoutRef.current = setTimeout(() => {
      updateCartApi({ id, quantity: newQuantity })
        .unwrap()
        .catch((err) => console.error('❌ DB update failed:', err));
    }, 500);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCartApi(id)
      .unwrap()
      .catch((err) => console.error('❌ Remove failed:', err));
  };

  const handleSaveForLater = (id: string) => {
    handleRemoveItem(id);
  };

  const handleClearCart = () => {
    cartItems.forEach(item => removeFromCartApi(item.id));
    setIsClearModalOpen(false);
  };

  const handleApplyPromo = (_code: string) => {};

  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-2 py-8 sm:px-4">
          <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-lg bg-muted"></div>
              ))}
            </div>
            <div className="h-96 animate-pulse rounded-lg bg-muted"></div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 2000 ? Math.floor(subtotal * 0.1) : 0;
  const deliveryCharges = subtotal > 1000 ? 0 : 50;
  const gstRate = 18;
  const gstAmount = Math.floor(((subtotal - discount + deliveryCharges) * gstRate) / 100);
  const total = subtotal - discount + deliveryCharges + gstAmount;

  const orderSummary = { subtotal, discount, deliveryCharges, gstRate, gstAmount, total };
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-2 py-8 sm:px-4">
        {cartItems.length > 0 ? (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground">Shopping Cart</h1>
                <p className="mt-1 text-muted-foreground">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              <button
                onClick={() => setIsClearModalOpen(true)}
                className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-destructive/10 hover:text-destructive"
              >
                <Icon name="TrashIcon" size={18} />
                Clear Cart
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    onSaveForLater={handleSaveForLater}
                  />
                ))}
              </div>
              <div>
                <OrderSummary
                  summary={orderSummary}
                  itemCount={totalItems}
                  onApplyPromo={handleApplyPromo}
                />
              </div>
            </div>

            <RelatedProducts products={relatedProducts} />
          </>
        ) : (
          <EmptyCart recentProducts={recentProducts} />
        )}
      </div>

      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearCart}
      />
    </div>
  );
}
