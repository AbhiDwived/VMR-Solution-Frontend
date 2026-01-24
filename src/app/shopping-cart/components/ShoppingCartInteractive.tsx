'use client';

import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import RelatedProducts from './RelatedProducts';
import EmptyCart from './EmptyCart';
import ClearCartModal from './ClearCartModal';
import Icon from '@/components/ui/AppIcon';
import { products } from '@/data/products';

interface CartItemData {
  id: string;
  name: string;
  image: string;
  alt: string;
  size: string;
  color: string;
  capacity: string;
  material: string;
  price: number;
  quantity: number;
  minOrderQty: number;
  isWholesale: boolean;
  stock: number;
}

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
  const [isHydrated, setIsHydrated] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: '1',
      name: products[0].name,
      image: products[0].image,
      alt: products[0].description,
      size: 'Large',
      color: 'Blue',
      capacity: '10 Liters',
      material: 'Virgin Plastic',
      price: products[0].price,
      quantity: 2,
      minOrderQty: 1,
      isWholesale: false,
      stock: 45,
    },
    {
      id: '2',
      name: products[75].name,
      image: products[75].image,
      alt: products[75].description,
      size: 'Medium',
      color: 'Multicolor',
      capacity: '200ml',
      material: 'Food Grade Plastic',
      price: products[75].price,
      quantity: 6,
      minOrderQty: 1,
      isWholesale: false,
      stock: 28,
    },
    {
      id: '3',
      name: products[55].name,
      image: products[55].image,
      alt: products[55].description,
      size: 'Large',
      color: 'White',
      capacity: 'Standard',
      material: 'High-Quality Plastic',
      price: products[55].price,
      quantity: 1,
      minOrderQty: 1,
      isWholesale: false,
      stock: 62,
    },
  ]);

  // Get related products from real data
  const relatedProducts: RelatedProduct[] = products
    .slice(10, 18)
    .map(product => ({
      id: product.id.toString(),
      name: product.name,
      image: product.image,
      alt: product.description,
      price: product.price,
      originalPrice: Math.floor(product.price * 1.3),
      rating: 4.5,
      reviews: Math.floor(Math.random() * 200) + 50,
    }));

  const recentProducts: RecentProduct[] = products
    .slice(20, 22)
    .map(product => ({
      id: product.id.toString(),
      name: product.name,
      image: product.image,
      alt: product.description,
      price: product.price,
    }));

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveForLater = (id: string) => {
    // Mock save for later functionality
    console.log('Saved for later:', id);
    handleRemoveItem(id);
  };

  const handleClearCart = () => {
    setCartItems([]);
    setIsClearModalOpen(false);
  };

  const handleApplyPromo = (code: string) => {
    console.log('Promo code applied:', code);
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
            {/* Header */}
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

            {/* Cart Content */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
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

              {/* Order Summary */}
              <div>
                <OrderSummary
                  summary={orderSummary}
                  itemCount={totalItems}
                  onApplyPromo={handleApplyPromo}
                />
              </div>
            </div>

            {/* Related Products */}
            <RelatedProducts products={relatedProducts} />
          </>
        ) : (
          <EmptyCart recentProducts={recentProducts} />
        )}
      </div>

      {/* Clear Cart Modal */}
      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearCart}
      />
    </div>
  );
}



