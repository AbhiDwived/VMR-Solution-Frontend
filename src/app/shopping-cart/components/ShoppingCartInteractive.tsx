'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeItem, updateQuantity } from '@/store/slices/cart';
import { useUpdateCartMutation, useRemoveFromCartMutation } from '@/store/api/cartApi';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import RelatedProducts from './RelatedProducts';
import EmptyCart from './EmptyCart';
import ClearCartModal from './ClearCartModal';
import Icon from '@/components/ui/AppIcon';
import { useGetProductsQuery } from '@/store/api/productsApi';

interface RelatedProduct {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
}

interface RecentProduct {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
}

export default function ShoppingCartInteractive() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const { data: productsData } = useGetProductsQuery({});
  const [updateCartApi] = useUpdateCartMutation();
  const [removeFromCartApi] = useRemoveFromCartMutation();
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const apiProducts = productsData?.data || [];

  const relatedProducts: RelatedProduct[] = apiProducts
    .slice(0, 8)
    .map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      image: '/placeholder.jpg',
      alt: product.description,
      price: Number(product.price),
      originalPrice: Math.floor(Number(product.price) * 1.3),
      rating: 4.5,
      reviews: 50,
    }));

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
    console.log('🔄 Quantity change:', { id, newQuantity, currentItems: cartItems });
    dispatch(updateQuantity({ id, quantity: newQuantity }));
    
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    updateTimeoutRef.current = setTimeout(() => {
      console.log('📡 API call - Update cart:', { id, quantity: newQuantity });
      updateCartApi({ id, quantity: newQuantity })
        .unwrap()
        .then((result) => console.log('✅ DB updated successfully:', result))
        .catch((err) => console.error('❌ DB update failed:', err));
    }, 500);
  };

  const handleRemoveItem = (id: string) => {
    console.log('🗑️ Remove item:', { id, currentItems: cartItems });
    dispatch(removeItem(id));
    console.log('📡 API call - Remove from cart:', id);
    removeFromCartApi(id)
      .unwrap()
      .then((result) => console.log('✅ Item removed from DB:', result))
      .catch((err) => console.error('❌ Remove failed:', err));
  };

  const handleSaveForLater = (id: string) => {
    handleRemoveItem(id);
  };

  const handleClearCart = () => {
    cartItems.forEach(item => dispatch(removeItem(item.id)));
    setIsClearModalOpen(false);
  };

  const handleApplyPromo = (_code: string) => {
    // Promo logic here
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
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

  const orderSummary = {
    subtotal,
    discount,
    deliveryCharges,
    gstRate,
    gstAmount,
    total,
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
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