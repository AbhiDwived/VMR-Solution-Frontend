'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeHeader from './WelcomeHeader';
import QuickActionCard from './QuickActionCard';
import OrderHistoryItem from './OrderHistoryItem';
import WishlistItem from './WishlistItem';
import AddressCard from './AddressCard';
import RecommendedProduct from './RecommendedProduct';
import ActivityFeedItem from './ActivityFeedItem';
import ProfileSection from './ProfileSection';
import Icon from '@/components/ui/AppIcon';
import { products } from '@/data/products';

interface Order {
  orderId: string;
  orderDate: string;
  status: string;
  statusColor: string;
  totalAmount: number;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    image: string;
    alt: string;
  }>;
  trackingNumber: string;
}

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  inStock: boolean;
  category: string;
}

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface RecommendedProductType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
}

interface Activity {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  timestamp: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

const DashboardInteractive = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  const userData = {
    name: 'Rajesh Kumar',
    accountStatus: 'Premium Member',
    loyaltyPoints: 2450,
  };

  const quickStats = {
    totalOrders: 12,
    activeOrders: 3,
    wishlistItems: 8,
  };

  const orders: Order[] = [
    {
      orderId: 'PM2026001234',
      orderDate: '18/01/2026',
      status: 'In Transit',
      statusColor: 'bg-accent/10 text-accent',
      totalAmount: 190,
      products: [
        {
          id: '1',
          name: products[0].name,
          quantity: 2,
          image: products[0].image,
          alt: products[0].description,
        },
        {
          id: '2',
          name: products[55].name,
          quantity: 1,
          image: products[55].image,
          alt: products[55].description,
        },
      ],
      trackingNumber: 'TRK2026PM789456',
    },
    {
      orderId: 'PM2026001189',
      orderDate: '12/01/2026',
      status: 'Delivered',
      statusColor: 'bg-success/10 text-success',
      totalAmount: 135,
      products: [
        {
          id: '3',
          name: products[75].name,
          quantity: 1,
          image: products[75].image,
          alt: products[75].description,
        },
      ],
      trackingNumber: 'TRK2026PM654321',
    },
    {
      orderId: 'PM2026001098',
      orderDate: '05/01/2026',
      status: 'Delivered',
      statusColor: 'bg-success/10 text-success',
      totalAmount: 60,
      products: [
        {
          id: '4',
          name: products[85].name,
          quantity: 1,
          image: products[85].image,
          alt: products[85].description,
        },
      ],
      trackingNumber: 'TRK2026PM123789',
    },
  ];

  const wishlistProducts: WishlistProduct[] = [
    {
      id: '5',
      name: products[95].name,
      price: products[95].price,
      originalPrice: Math.floor(products[95].price * 1.3),
      image: products[95].image,
      alt: products[95].description,
      inStock: true,
      category: products[95].category,
    },
    {
      id: '6',
      name: products[96].name,
      price: products[96].price,
      originalPrice: Math.floor(products[96].price * 1.4),
      image: products[96].image,
      alt: products[96].description,
      inStock: true,
      category: products[96].category,
    },
    {
      id: '7',
      name: products[97].name,
      price: products[97].price,
      image: products[97].image,
      alt: products[97].description,
      inStock: false,
      category: products[97].category,
    },
    {
      id: '8',
      name: products[98].name,
      price: products[98].price,
      originalPrice: Math.floor(products[98].price * 1.2),
      image: products[98].image,
      alt: products[98].description,
      inStock: true,
      category: products[98].category,
    },
  ];

  const addresses: Address[] = [
    {
      id: '1',
      name: 'Home',
      addressLine1: '123, Green Valley Apartments',
      addressLine2: 'Sector 15, Rohini',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110085',
      phone: '9876543210',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Office',
      addressLine1: 'Plot No. 45, Industrial Area',
      addressLine2: 'Phase 2, Udyog Vihar',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122016',
      phone: '9876543211',
      isDefault: false,
    },
  ];

  const recommendedProducts: RecommendedProductType[] = [
    {
      id: '9',
      name: products[99].name,
      price: products[99].price,
      originalPrice: Math.floor(products[99].price * 1.3),
      image: products[99].image,
      alt: products[99].description,
      rating: 4.5,
      reviewCount: 234,
    },
    {
      id: '10',
      name: products[100].name,
      price: products[100].price,
      image: products[100].image,
      alt: products[100].description,
      rating: 4.2,
      reviewCount: 156,
    },
    {
      id: '11',
      name: products[101].name,
      price: products[101].price,
      originalPrice: Math.floor(products[101].price * 1.2),
      image: products[101].image,
      alt: products[101].description,
      rating: 4.7,
      reviewCount: 189,
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: '1',
      icon: 'TruckIcon',
      iconColor: 'bg-accent',
      title: 'Order Shipped',
      description: 'Your order #PM2026001234 has been shipped and is on the way',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      icon: 'HeartIcon',
      iconColor: 'bg-error',
      title: 'Added to Wishlist',
      description: 'Premium Insulated Water Bottle added to your wishlist',
      timestamp: '1 day ago',
    },
    {
      id: '3',
      icon: 'CheckCircleIcon',
      iconColor: 'bg-success',
      title: 'Order Delivered',
      description: 'Order #PM2026001189 has been successfully delivered',
      timestamp: '6 days ago',
    },
    {
      id: '4',
      icon: 'StarIcon',
      iconColor: 'bg-warning',
      title: 'Review Submitted',
      description: 'Thank you for reviewing Decorative Flower Pots Set',
      timestamp: '1 week ago',
    },
  ];

  const profileData: ProfileData = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '9876543210',
    dateOfBirth: '15/08/1985',
  };

  const handleRemoveFromWishlist = (productId: string) => {
    console.log('Remove from wishlist:', productId);
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    router.push('/shopping-cart');
  };

  const handleEditAddress = (addressId: string) => {
    console.log('Edit address:', addressId);
  };

  const handleDeleteAddress = (addressId: string) => {
    console.log('Delete address:', addressId);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    console.log('Set default address:', addressId);
  };

  const handleSaveProfile = (data: ProfileData) => {
    console.log('Save profile:', data);
  };

  const tabs = [
    { id: 'orders' as const, label: 'Order History', icon: 'ShoppingBagIcon' },
    { id: 'wishlist' as const, label: 'Wishlist', icon: 'HeartIcon' },
    { id: 'addresses' as const, label: 'Addresses', icon: 'MapPinIcon' },
    { id: 'profile' as const, label: 'Profile', icon: 'UserIcon' },
  ];

  return (
    <div className="space-y-6">
      <WelcomeHeader
        userName={userData.name}
        accountStatus={userData.accountStatus}
        loyaltyPoints={userData.loyaltyPoints}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <QuickActionCard
          title="Total Orders"
          value={quickStats.totalOrders}
          icon="ShoppingBagIcon"
          bgColor="bg-primary"
          textColor="text-primary-foreground"
          onClick={() => setActiveTab('orders')}
        />
        <QuickActionCard
          title="Active Orders"
          value={quickStats.activeOrders}
          icon="TruckIcon"
          bgColor="bg-accent"
          textColor="text-accent-foreground"
          onClick={() => router.push('/order-tracking')}
        />
        <QuickActionCard
          title="Wishlist Items"
          value={quickStats.wishlistItems}
          icon="HeartIcon"
          bgColor="bg-secondary"
          textColor="text-secondary-foreground"
          onClick={() => setActiveTab('wishlist')}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card shadow-elevation-1">
            <div className="border-b border-border">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-1 items-center justify-center space-x-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-smooth ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab.icon as any} size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 md:p-6">
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-semibold text-card-foreground">
                      Order History
                    </h2>
                    <button className="flex items-center space-x-1 text-sm text-primary transition-smooth hover:text-primary/80">
                      <Icon name="FunnelIcon" size={16} />
                      <span>Filter</span>
                    </button>
                  </div>
                  {orders.map((order) => (
                    <OrderHistoryItem key={order.orderId} {...order} />
                  ))}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-semibold text-card-foreground">
                      My Wishlist
                    </h2>
                    <p className="caption text-muted-foreground">
                      {wishlistProducts.length} items
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {wishlistProducts.map((product) => (
                      <WishlistItem
                        key={product.id}
                        {...product}
                        onRemove={() => handleRemoveFromWishlist(product.id)}
                        onAddToCart={() => handleAddToCart(product.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-semibold text-card-foreground">
                      Saved Addresses
                    </h2>
                    <button className="flex items-center space-x-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:scale-[0.97]">
                      <Icon name="PlusIcon" size={16} />
                      <span>Add New</span>
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        {...address}
                        onEdit={() => handleEditAddress(address.id)}
                        onDelete={() => handleDeleteAddress(address.id)}
                        onSetDefault={() => handleSetDefaultAddress(address.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <ProfileSection
                  profileData={profileData}
                  onSave={handleSaveProfile}
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1">
            <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <ActivityFeedItem key={activity.id} {...activity} />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-card-foreground">
                Recommended for You
              </h3>
              <button
                onClick={() => router.push('/product-catalog')}
                className="text-sm text-primary transition-smooth hover:text-primary/80"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recommendedProducts.map((product) => (
                <RecommendedProduct key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInteractive;



