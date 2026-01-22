'use client';

import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import RelatedProducts from './RelatedProducts';
import EmptyCart from './EmptyCart';
import ClearCartModal from './ClearCartModal';
import Icon from '@/components/ui/AppIcon';

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
      name: 'Premium Plastic Flower Pot Set',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
      alt: 'Set of three terracotta-colored plastic flower pots with drainage holes on wooden surface',
      size: 'Large',
      color: 'Terracotta',
      capacity: '5 Liters',
      material: 'Virgin Plastic',
      price: 299,
      quantity: 2,
      minOrderQty: 1,
      isWholesale: false,
      stock: 45,
    },
    {
      id: '2',
      name: 'Insulated Coffee Mugs - Pack of 6',
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
      alt: 'Six colorful insulated plastic coffee mugs with handles arranged in a row',
      size: 'Medium',
      color: 'Multicolor',
      capacity: '350ml',
      material: 'Food Grade Plastic',
      price: 449,
      quantity: 1,
      minOrderQty: 1,
      isWholesale: false,
      stock: 28,
    },
    {
      id: '3',
      name: 'Airtight Storage Container Set',
      image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg',
      alt: 'Stack of transparent plastic airtight containers with blue lids containing various food items',
      size: 'Assorted',
      color: 'Transparent',
      capacity: '500ml to 2L',
      material: 'BPA-Free Plastic',
      price: 799,
      quantity: 3,
      minOrderQty: 1,
      isWholesale: false,
      stock: 62,
    },
    {
      id: '4',
      name: 'Heavy Duty Plastic Buckets - Wholesale',
      image: 'https://images.pexels.com/photos/6419121/pexels-photo-6419121.jpeg',
      alt: 'Stack of blue heavy-duty plastic buckets with metal handles in warehouse setting',
      size: 'Large',
      color: 'Blue',
      capacity: '20 Liters',
      material: 'High-Density Plastic',
      price: 189,
      quantity: 12,
      minOrderQty: 10,
      isWholesale: true,
      stock: 150,
    },
  ]);

  const relatedProducts: RelatedProduct[] = [
    {
      id: '5',
      name: 'Decorative Hanging Planters',
      image: 'https://images.pexels.com/photos/6231579/pexels-photo-6231579.jpeg',
      alt: 'White plastic hanging planters with green plants suspended from ceiling',
      price: 349,
      originalPrice: 499,
      rating: 4.5,
      reviews: 128,
    },
    {
      id: '6',
      name: 'Stackable Kitchen Containers',
      image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg',
      alt: 'Set of stackable transparent plastic kitchen containers with colorful lids',
      price: 599,
      originalPrice: 799,
      rating: 4.7,
      reviews: 245,
    },
    {
      id: '7',
      name: 'Colorful Plastic Dustbins',
      image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
      alt: 'Three colorful plastic dustbins with pedal lids in green, blue, and red',
      price: 449,
      originalPrice: 599,
      rating: 4.3,
      reviews: 89,
    },
    {
      id: '8',
      name: 'Water Storage Bottles Set',
      image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg',
      alt: 'Set of five transparent plastic water bottles with different colored caps',
      price: 299,
      originalPrice: 399,
      rating: 4.6,
      reviews: 312,
    },
  ];

  const recentProducts: RecentProduct[] = [
    {
      id: '9',
      name: 'Garden Tool Organizer',
      image: 'https://images.pexels.com/photos/4505168/pexels-photo-4505168.jpeg',
      alt: 'Green plastic garden tool organizer with multiple compartments holding tools',
      price: 399,
    },
    {
      id: '10',
      name: 'Lunch Box Containers',
      image: 'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
      alt: 'Colorful plastic lunch box containers with compartments and secure lids',
      price: 249,
    },
  ];

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