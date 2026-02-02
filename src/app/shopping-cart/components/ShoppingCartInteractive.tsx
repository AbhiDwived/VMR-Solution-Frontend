'use client';

import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import RelatedProducts from './RelatedProducts';
import EmptyCart from './EmptyCart';
import ClearCartModal from './ClearCartModal';
import Icon from '@/components/ui/AppIcon';
import { useGetProductsQuery } from '@/store/api/productsApi';

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
  const { data: productsData } = useGetProductsQuery({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Use API data for cart items (mock data using first few products)
  const apiProducts = productsData?.data || [];
  
  const [cartItems, setCartItems] = useState<CartItemData[]>(() => {
    if (apiProducts.length >= 3) {
      return [
        {
          id: '1',
          name: apiProducts[0]?.name || 'Product 1',
          image: (() => {
            const product = apiProducts[0];
            if (!product) return '/placeholder.jpg';
            let productImages = [];
            if (Array.isArray(product.product_images)) {
              productImages = product.product_images;
            } else if (typeof product.product_images === 'string') {
              try {
                productImages = JSON.parse(product.product_images || '[]');
              } catch (error) {
                productImages = [];
              }
            }
            return productImages?.[0] || '/placeholder.jpg';
          })(),
          alt: apiProducts[0]?.description || 'Product description',
          size: 'Large',
          color: 'Blue',
          capacity: '10 Liters',
          material: 'Virgin Plastic',
          price: Number(apiProducts[0]?.discount_price) || Number(apiProducts[0]?.price) || 55,
          quantity: 2,
          minOrderQty: 1,
          isWholesale: false,
          stock: 45,
        },
        {
          id: '2',
          name: apiProducts[1]?.name || 'Product 2',
          image: (() => {
            const product = apiProducts[1];
            if (!product) return '/placeholder.jpg';
            let productImages = [];
            if (Array.isArray(product.product_images)) {
              productImages = product.product_images;
            } else if (typeof product.product_images === 'string') {
              try {
                productImages = JSON.parse(product.product_images || '[]');
              } catch (error) {
                productImages = [];
              }
            }
            return productImages?.[0] || '/placeholder.jpg';
          })(),
          alt: apiProducts[1]?.description || 'Product description',
          size: 'Medium',
          color: 'Multicolor',
          capacity: '200ml',
          material: 'Food Grade Plastic',
          price: Number(apiProducts[1]?.discount_price) || Number(apiProducts[1]?.price) || 270,
          quantity: 6,
          minOrderQty: 1,
          isWholesale: false,
          stock: 28,
        },
        {
          id: '3',
          name: apiProducts[2]?.name || 'Product 3',
          image: (() => {
            const product = apiProducts[2];
            if (!product) return '/placeholder.jpg';
            let productImages = [];
            if (Array.isArray(product.product_images)) {
              productImages = product.product_images;
            } else if (typeof product.product_images === 'string') {
              try {
                productImages = JSON.parse(product.product_images || '[]');
              } catch (error) {
                productImages = [];
              }
            }
            return productImages?.[0] || '/placeholder.jpg';
          })(),
          alt: apiProducts[2]?.description || 'Product description',
          size: 'Large',
          color: 'White',
          capacity: 'Standard',
          material: 'High-Quality Plastic',
          price: Number(apiProducts[2]?.discount_price) || Number(apiProducts[2]?.price) || 80,
          quantity: 1,
          minOrderQty: 1,
          isWholesale: false,
          stock: 62,
        },
      ];
    }
    return [];
  });

  // Get related products from API data
  const relatedProducts: RelatedProduct[] = apiProducts
    .slice(3, 11)
    .map((product: any) => {
      let productImages = [];
      if (Array.isArray(product.product_images)) {
        productImages = product.product_images;
      } else if (typeof product.product_images === 'string') {
        try {
          productImages = JSON.parse(product.product_images || '[]');
        } catch (error) {
          productImages = [];
        }
      }
      
      return {
        id: product.id.toString(),
        name: product.name,
        image: productImages?.[0] || '/placeholder.jpg',
        alt: product.description,
        price: Number(product.discount_price) || Number(product.price),
        originalPrice: Math.floor((Number(product.discount_price) || Number(product.price)) * 1.3),
        rating: 4.5,
        reviews: Math.floor(Math.random() * 200) + 50,
      };
    });

  const recentProducts: RecentProduct[] = apiProducts
    .slice(11, 13)
    .map((product: any) => {
      let productImages = [];
      if (Array.isArray(product.product_images)) {
        productImages = product.product_images;
      } else if (typeof product.product_images === 'string') {
        try {
          productImages = JSON.parse(product.product_images || '[]');
        } catch (error) {
          productImages = [];
        }
      }
      
      return {
        id: product.id.toString(),
        name: product.name,
        image: productImages?.[0] || '/placeholder.jpg',
        alt: product.description,
        price: Number(product.discount_price) || Number(product.price),
      };
    });

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



